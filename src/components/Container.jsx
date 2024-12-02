

export default function Container({ className, children }) {
    return (
        <section className={`flex items-center flex-col py-10 ${className}`}>
            {children}
        </section>
    )
}