import classNames from "classnames";
import type {ToastContentProps} from "react-toastify";
import styles from "./Toast.module.css";

type ToastData = {
	title: string;
	message: string;
	code?: number;
};

function Toast({
	toastProps,
	data: {message, title, code},
}: ToastContentProps<ToastData>) {
	const toastClassname = classNames(styles.toast);
	const toastType = toastProps.type;

	return (
		<div className={toastClassname}>
			<h3>{title}</h3>
			<p className={classNames(styles.message)}>{message}</p>
			{code && toastType === "warning" && (
				<p>
					{`Warn code `}
					<span className="code">{code}</span>
				</p>
			)}
			{code && toastType === "error" && (
				<p>
					{`Error code `}
					<span className="code">{code}</span>
				</p>
			)}
		</div>
	);
}

export default Toast;
