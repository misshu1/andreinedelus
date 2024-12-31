import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import {source} from "@cloudinary/url-gen/actions/overlay";
import {Position} from "@cloudinary/url-gen/qualifiers";
import {compass} from "@cloudinary/url-gen/qualifiers/gravity";
import {text} from "@cloudinary/url-gen/qualifiers/source";
import {TextStyle} from "@cloudinary/url-gen/qualifiers/textStyle";

const cloudinary = new Cloudinary({
	cloud: {
		cloudName: "misshu",
	},
	url: {
		secure: true,
	},
});

const getThumbnail = (title: string, description: string) => {
	const titleSource = source(
		text(
			title,
			new TextStyle("Roboto", 60)
				.fontWeight("bold")
				.fontStyle("normal")
				.textAlignment("left")
				.lineSpacing(2),
		).textColor("#fff"),
	).position(
		new Position().gravity(compass("north_west")).offsetY(55).offsetX(200),
	);
	const descriptionSource = source(
		text(
			description,
			new TextStyle("Roboto", 30)
				.fontStyle("normal")
				.textAlignment("left")
				.lineSpacing(10),
		).textColor("#fff"),
	).position(
		new Position().gravity(compass("north_west")).offsetY(300).offsetX(50),
	);

	const thumbnail = new CloudinaryImage("andreinedelus.png")
		.setCloudConfig({cloudName: "misshu"})
		.format("auto")
		.quality("auto")
		.addTransformation(`w_600,c_fit,${titleSource.toString()}`)
		.addTransformation(`w_600,c_fit,${descriptionSource.toString()}`);

	return thumbnail.toURL();
};

export {cloudinary, getThumbnail};
