import PresaleItem from './PresaleItem'

const PresaleList = ({ presales, action }) => {
    return (
        <ul className={""}>
            {presales.map((presale) => (
                <PresaleItem key={presale.account.idx} {...presale.account} publicKey={presale.publicKey} action={action} />
            ))}
        </ul>
    )
}

export default PresaleList
