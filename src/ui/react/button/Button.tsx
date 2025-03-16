import {type FC, type ReactNode} from "react";
import classNames from "classnames";
import styles from "./Button.module.css";

type Props = {
	title: string;
	id?: string;
	children?: ReactNode;
	disabled?: boolean;
	type?: "button" | "submit";
	onClick?: () => void;
	size?: "small" | "large";
};

const Button: FC<Props> = ({
	onClick,
	type = "button",
	disabled = false,
	children,
	title,
	size = "small",
	id,
}) => {
	const buttonClassnames = classNames(styles.button, {
		[styles.disabled]: disabled,
		[styles.large]: size === "large",
		[styles.small]: size === "small",
	});
	return (
		<button
			id={id}
			className={buttonClassnames}
			disabled={disabled}
			onClick={onClick}
			type={type}
		>
			{children && <div className={styles.icon}>{children}</div>}
			<span className={classNames(styles.btnText)}>{title}</span>
		</button>
	);
};

export default Button;
