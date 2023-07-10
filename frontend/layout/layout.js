import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gray-300">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 h-3/2 grid lg:grid-cols-2">
        <div className={styles.imgStyle}>
          <div className={styles.loginImg}></div>
        </div>
        <div className="right flex flex-col justify-center items-center">
          <div className="text-center p-10 w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
