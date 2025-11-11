import clsx from "clsx";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

function Container({ children, className }: ContainerProps) {
  return (
    <div className={clsx("container mx-auto px-4", className)}>{children}</div>
  );
}

export { Container };
