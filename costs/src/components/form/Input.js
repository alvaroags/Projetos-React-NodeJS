import styles from './Input.module.css';

export function Input({type, text, name, placeholder, value, handleOnChange}){
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <input 
            type={type} 
            name={name} 
            id={name} 
            placeholder={placeholder} 
            onChange={handleOnChange} 
            value={value} />
        </div>
    )
}

export function Select({ text, name, options, value, handleOnChange}){
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <select 
            name={name} 
            id={name} 
            onChange={handleOnChange} 
            value={value} >
            <option disabled s >Selecione o tipo de projeto</option>
            {options.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
            ))}
            </select>
        </div>
    )
}

export function Submit({type, text, positionBtn }){
    return (
        <div className={`${positionBtn ? styles.form_control : ''}`} >
            <button className={`${styles.btn} ${styles[positionBtn]}`} type={type}>{text}</button>
        </div>
    )
}