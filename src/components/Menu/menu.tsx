'use client';

import { useState, useEffect } from 'react';
import { IoMenu } from "react-icons/io5";
import { FiX } from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from 'next/link';

export const Menu = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Configurar valor inicial
        handleResize();

        // Adicionar listener para mudanças de tamanho da tela
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {/* Header fixo */}
            <header
            className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center text-[var(--primary-foreground)] p-4 header-blur border-b border-[var(--border)]">
                <h2
                className='text-[20px] font-bold text-[var(--ring)]'>
                    ForumTech
                </h2>
                {isMobile ? (
                    <div
                    className='rounded-md bg-transparent hover:bg-[var(--muted)] inline-block cursor-pointer p-2'
                    onClick={() => setIsOpen(!isOpen)}
                    >
                        { isOpen ? (
                            <FiX size={28} />
                        ) : (
                            <IoMenu size={28} />
                        )}
                    </div>
                ) : (
                    <div className="text-[var(--primary-foreground)] border-b border-[var(--border)] ">
                        <div className='flex justify-end space-x-4'>
                            <Link href="/" 
                            className='rounded-md hover:text-[var(--ring)] transition-colors p-2'
                            >
                                Inicio
                            </Link>
                            <Link href="/topics" className='rounded-md hover:text-[var(--ring)] transition-colors p-2'
                            >
                                Tópicos
                            </Link>
                            <Link 
                            href="/profile" className='rounded-md hover:text-[var(--ring)] transition-colors p-2'
                            >
                                Meu Perfil
                            </Link>
                            <Link href="/admin" className='rounded-md hover:text-[var(--ring)] transition-colors flex items-center gap-2 p-2'
                            >   
                                <MdOutlineAdminPanelSettings size={20} />
                                Admin
                            </Link>
                        </div>
                    </div>
                )}
            </header>
            
            {/* Menu mobile - aparece abaixo do header */}
            {isMobile && isOpen && (
                <div 
                className="fixed top-[72px] left-0 right-0 z-40 text-[var(--primary-foreground)] p-4 menu-blur border-b border-[var(--border)] ">
                    <div className='flex flex-col space-y-2'>
                        <Link href="/" 
                        className='rounded-md hover:text-[var(--ring)] transition-colors p-2 block'
                        >
                            Inicio
                        </Link>
                        <Link href="/topics" className='rounded-md hover:text-[var(--ring)] transition-colors p-2 block'
                        >
                            Tópicos
                        </Link>
                        <a href="/myprofile" className='rounded-md hover:text-[var(--ring)] transition-colors p-2 block'
                        >
                            Meu Perfil
                        </a>
                        <Link href="/admin" className='rounded-md hover:text-[var(--ring)] transition-colors flex items-center gap-2 p-2'
                        >   
                            <MdOutlineAdminPanelSettings size={20} />
                            Admin
                        </Link>
                    </div>
                </div>
            )}

        </>
    );
};