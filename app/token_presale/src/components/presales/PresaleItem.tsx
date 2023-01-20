

const PresaleItem = ({ idx, content, marked, dateline, publicKey, action }) => {
    const handleMarkPresale = () => {
        // Only allow unchecked presale to be marked
        if (marked) return

        action(publicKey, idx)
    }

    const handleRemovePresale = () => {
        action(publicKey, idx)
    }

    return (
        <li key={idx} className={""}>
            <div onClick={handleMarkPresale} className={""} />
            <div>
                <span className="">{content}</span>
                {dateline && (
                    <div className={""}>
                        <span>{dateline}</span>
                    </div>
                )}
            </div>
            <div className={""}>
                <div onClick={handleRemovePresale} className={""} />
            </div>
        </li>
    )
}

export default PresaleItem
