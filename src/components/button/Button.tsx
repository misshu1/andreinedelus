import {type FC} from "react";
import classNames from "classnames";
import styles from "./Button.module.css";

type Props = {
	children: string;
	disabled?: boolean;
	type?: "button" | "submit";
	onClick?: () => void;
};

const Button: FC<Props> = ({
	onClick,
	type = "button",
	disabled = false,
	children,
}) => {
	const buttonClassnames = classNames(styles.button, {
		[styles.disabled]: disabled,
	});
	return (
		<button
			className={buttonClassnames}
			disabled={disabled}
			onClick={onClick}
			type={type}
		>
			<span className={classNames(styles.btnText)}>{children}</span>
		</button>
	);
};

export default Button;
