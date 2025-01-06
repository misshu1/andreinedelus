import type {FC, JSX} from "react";
import {Controller, useForm, type SubmitHandler} from "react-hook-form";
import styles from "./Contact.module.css";
import {zodResolver} from "@hookform/resolvers/zod";
import {
	defaultValues,
	validationSchema,
	type ValidationSchema,
} from "./validation-schema";
import TextField from "@components/inputs/TextField/TextField";
import classNames from "classnames";
import {encodeFormValues} from "@utils/utils";

type ContactProps = {
	children: JSX.Element;
};

const Contact: FC<ContactProps> = ({children}) => {
	const {
		control,
		handleSubmit,
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
				.then(() => console.log("success"))
				.catch(error => alert(error));
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
					></h2>
					<p className={classNames(styles.contactInfoText)}>
						I'm here to build your next project, send me a message.
					</p>
					<p className={classNames(styles.contactInfoText)}>
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
				<button
					type="submit"
					aria-label="send message"
					disabled={!isValid || isSubmitting}
				>
					Send Message
				</button>
			</form>
		</section>
	);
};

export default Contact;
