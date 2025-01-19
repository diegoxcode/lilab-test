import styles from './loading.module.css';
import './styles.css';

const Loading = () => {
    return (
        <div className={styles.loading__wrapper}>
            <div className="shapes-6"></div>
        </div>
    );
};

export default Loading;