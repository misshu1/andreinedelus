import {Slide, ToastContainer} from "react-toastify";

const Notifications = () => {
	return (
		<ToastContainer
			position="bottom-right"
			hideProgressBar={true}
			newestOnTop={true}
			limit={3}
			closeOnClick={false}
			pauseOnHover={true}
			transition={Slide}
		/>
	);
};

export default Notifications;
