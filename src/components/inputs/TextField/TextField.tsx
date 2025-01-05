import {type ChangeEvent, type FC, type JSX} from "react";
import classNames from "classnames";
import styles from "./TextField.module.css";

type TextFieldProps = {
	name: string;
	type: "text" | "textarea" | "email" | "password";
	isValid: boolean;
	isInvalid: boolean;
	label: string;
	value: string;
	onChange: (e: ChangeEvent) => void;
	autoComplete?: "on" | "off";
	isDisabled?: boolean;
	placeholder?: string;
	error?: string;
	children?: JSX.Element;
};

const TextField: FC<TextFieldProps> = ({
	type,
	name,
	isValid,
	isInvalid,
	error,
	onChange,
	label,
	value,
	isDisabled,
	placeholder,
	children,
	autoComplete = "off",
}) => {
	const containerClassname = classNames(styles.textFieldContainer, {
		[styles.invalid]: isInvalid,
		[styles.valid]: isValid,
		[styles.disabled]: isDisabled,
	});

	return (
		<div className={styles.container}>
			<div className={containerClassname}>
				<label htmlFor={name}>{label}</label>
				{type === "textarea" ? (
					<textarea
						className={styles.textarea}
						id={name}
						name={name}
						onChange={onChange}
						value={value}
						placeholder={placeholder}
						disabled={isDisabled}
						autoComplete={autoComplete}
					/>
				) : (
					<input
						id={name}
						name={name}
						type={type}
						onChange={onChange}
						value={value}
						placeholder={placeholder}
						disabled={isDisabled}
						autoComplete={autoComplete}
					/>
				)}
			</div>
			{error && (
				<span className={classNames(styles.error)}>
					{children && <span>{children}</span>}
					<span>{error}</span>
				</span>
			)}
		</div>
	);
};

export default TextField;
