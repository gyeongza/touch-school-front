export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto flex h-screen w-full max-w-md flex-col overflow-y-auto bg-white p-4">{children}</div>;
}
