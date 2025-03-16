import {useEffect} from "react";

const Instagram = () => {
	const fetchInstagramPosts = async () => {
		const url = `/.netlify/functions/instagram`;
		try {
			const response = await fetch(url);
			console.log(response);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchInstagramPosts();
	}, []);

	return <div>Instagram</div>;
};

export default Instagram;
