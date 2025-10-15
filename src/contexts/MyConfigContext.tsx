'use client';

import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { myProfileService } from "@/services/myProfileService";

interface MyConfigContextType {
    email: string;
    setEmail: (email: string) => void;
    passwordForEmail: string;
    setPasswordForEmail: (password: string) => void;
    updateEmail: () => void;
}

const myConfigContext = createContext<MyConfigContextType | undefined>(undefined);

interface MyConfigProviderProps {
    children: ReactNode;
}

export const MyConfigProvider = ({ children }: MyConfigProviderProps) => {
    const { data: session } = useSession();
    const [email, setEmail] = useState<string>(session?.user?.email || "");
    const [passwordForEmail, setPasswordForEmail] = useState<string>("");

    const updateEmail = useCallback(async ()=> {
        if(!session?.accessToken){
            console.error("No access token available");
            return 
        }

        try {
            const res = await myProfileService.updateEmail(session.accessToken, email, passwordForEmail)

            setEmail(res?.data.newEmail)
        }
        catch(error)
        {
            console.log(error)
        }
    }, [session?.accessToken, email, setEmail, passwordForEmail])

    return (
        <myConfigContext.Provider
        value={{ email, setEmail, passwordForEmail, setPasswordForEmail, updateEmail }}>
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
