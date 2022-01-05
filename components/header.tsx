import Image from "next/image"

export default function Header() {
    return (
        <div className="flex absolute top-0 w-full bg-red-500 py-4 px-6">
            <a href="https://www.arken.dk">
                <Image
                    src="https://www.arken.dk/wp-content/themes/arken/images/logo_large.png"
                    alt="Arken logo"
                    width={111}
                    height={22.47}
                />
            </a>
        </div>
    )
}