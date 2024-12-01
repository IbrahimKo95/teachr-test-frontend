

export default function Container({ className, children }) {
    return (
        <section className={`flex justify-center py-10 ${className}`}>
            {children}
        </section>
    )
}