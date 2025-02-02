import type {FC, JSX} from "react";
import {Controller, useForm, type SubmitHandler} from "react-hook-form";
import styles from "./Contact.module.css";
import {zodResolver} from "@hookform/resolvers/zod";
import classNames from "classnames";
import {
	defaultValues,
	validationSchema,
	type ValidationSchema,
} from "./validation-schema";
import TextField from "@components/inputs/TextField/TextField";
import {encodeFormValues} from "@utils/utils";
import {useNotifications} from "@components/notifications/useNotifications";
import Button from "@components/button/Button";

type ContactProps = {
	children: JSX.Element;
};

const Contact: FC<ContactProps> = ({children}) => {
	const {showSuccess, showError} = useNotifications();
	const {
		control,
		handleSubmit,
		reset,
		formState: {errors, isValid, isSubmitting},
	} = useForm<ValidationSchema>({
		defaultValues: defaultValues,
		resolver: zodResolver(validationSchema),
		mode: "all",
		reValidateMode: "onBlur",
	});

	const onSubmit: SubmitHandler<ValidationSchema> = ({
		email,
		message,
		name,
	}) => {
		if (Object.keys(errors).length === 0) {
			fetch("/", {
				method: "POST",
				headers: {"Content-Type": "application/x-www-form-urlencoded"},
				body: encodeFormValues({
					"form-name": "contact",
					name,
					email,
					message,
				}),
			})
				.then(() => {
					showSuccess("Success", "Your message has been sent.");
					reset();
				})
				.catch(() =>
					showError(
						"Error",
						"Failed to send the message. Please try again.",
						500,
					),
				);
		}
	};

	return (
		<section className={classNames(styles.container)}>
			<form
				className={classNames(styles.form)}
				onSubmit={handleSubmit(onSubmit)}
				data-netlify="true"
				netlify-honeypot="bot-field"
				name="contact"
				method="post"
			>
				<input style={{display: "none"}} name="bot-field" />
				<div className={classNames(styles.textContainer)}>
					<h2
						id="contactTitle"
						className={classNames(styles.title)}
						data-content="Contact"
					>
						Contact
					</h2>
					<p>
						I'm here to build your next project, send me a message.
					</p>
					<p>
						You can contact me at
						<strong> nedelusandrei[at]gmail.com </strong>or use the
						contact form below.
					</p>
				</div>
				<div className={styles.inputContainer}>
					<Controller
						name="name"
						control={control}
						render={({
							field,
							fieldState: {invalid, isDirty, error},
						}) => (
							<TextField
								{...field}
								type="text"
								isInvalid={invalid}
								isValid={!invalid && isDirty}
								error={error?.message}
								label="Name"
								placeholder="John Doe"
							>
								{children}
							</TextField>
						)}
					/>
				</div>
				<div className={styles.inputContainer}>
					<Controller
						name="email"
						control={control}
						render={({
							field,
							fieldState: {invalid, isDirty, error},
						}) => (
							<TextField
								{...field}
								type="email"
								isInvalid={invalid}
								isValid={!invalid && isDirty}
								error={error?.message}
								label="Email"
								placeholder="johndoe@example.com"
							>
								{children}
							</TextField>
						)}
					/>
				</div>
				<div className={styles.inputContainer}>
					<Controller
						name="message"
						control={control}
						render={({
							field,
							fieldState: {invalid, isDirty, error},
						}) => (
							<TextField
								type="textarea"
								{...field}
								isInvalid={invalid}
								isValid={!invalid && isDirty}
								error={error?.message}
								label="Message"
								placeholder="Your message."
							>
								{children}
							</TextField>
						)}
					/>
				</div>
				<div className={styles.buttonsContainer}>
					<Button
						type="submit"
						aria-label="send message"
						disabled={!isValid || isSubmitting}
						title="Send Message"
					/>
				</div>
			</form>
		</section>
	);
};

export default Contact;
