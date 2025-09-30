import Avatar from '@/components/ui/avatar';

export default function ExamplePage() {
  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold">Exemplos de Avatar</h2>
      
      {/* Avatar com imagem */}
      <div className="flex items-center gap-4">
        <Avatar 
          src="https://github.com/shadcn.png" 
          alt="Usuário" 
          size="sm" 
        />
        <span>Avatar com imagem</span>
      </div>

      {/* Avatar sem imagem (fallback) */}
      <div className="flex items-center gap-4">
        <Avatar 
          fallback="JS" 
          size="md" 
        />
        <span>João Silva</span>
      </div>

      {/* Diferentes tamanhos */}
      <div className="flex items-center gap-4">
        <Avatar fallback="A" size="sm" />
        <Avatar fallback="B" size="md" />
        <Avatar fallback="C" size="lg" />
        <Avatar fallback="D" size="xl" />
      </div>

      {/* Avatar customizado */}
      <div className="flex items-center gap-4">
        <Avatar 
          fallback="AD" 
          size="lg"
          className="bg-[var(--primary)] text-[var(--primary-foreground)]"
        />
        <span>Admin</span>
      </div>
    </div>
  );
}