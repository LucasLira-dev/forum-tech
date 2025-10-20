'use client';

import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { myProfileService } from "@/services/myProfileService";
import { useRouter } from "next/navigation";

interface MyConfigContextType {
    deleteAccount: () => Promise<void>;
    isDeleting: boolean;
}

const myConfigContext = createContext<MyConfigContextType | undefined>(undefined);

interface MyConfigProviderProps {
    children: ReactNode;
}

export const MyConfigProvider = ({ children }: MyConfigProviderProps) => {
    const { data: session } = useSession();
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const router = useRouter();

    const deleteAccount = useCallback(async ()=> {
        if(!session?.accessToken){
            console.error("No access token available");
            return 
        }

        try {
            setIsDeleting(true);
            await myProfileService.deleteAccount(session.accessToken)
            await signOut({ redirect: false });
            router.push("/login");
        }
        catch(error)
        {
            console.log(error)
        }
        finally {
            setIsDeleting(false);
        }
    }, [session?.accessToken, router])

    return (
        <myConfigContext.Provider
        value={{ deleteAccount, isDeleting }}>
            {children}
        </myConfigContext.Provider>
    )
}

export const useMyConfig = () => {
    const context = useContext(myConfigContext)
    if(!context){
        throw new Error("useMyConfig must be used within a MyConfigProvider");
    }
    return context;
}
