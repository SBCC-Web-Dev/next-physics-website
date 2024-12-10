interface ContainerProps {
    children: React.ReactNode
    className?: string
}

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
    return (
        <div className={`max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 ${className}`}>
            {children}
        </div>
    );
};

export default Container;
