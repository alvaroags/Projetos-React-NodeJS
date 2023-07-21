import styles from './Container.module.css';

export function Container(props){
    return(
        <div className={`${styles.container} ${styles[props.customName]}`}>
            {props.children}
        </div>
    )
}