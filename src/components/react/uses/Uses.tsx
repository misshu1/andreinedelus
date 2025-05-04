import type {FC} from "react";
import classNames from "classnames";
import Carousel, {
	type CarouselImage,
} from "@components/react/carousel/Carousel";
import styles from "./Uses.module.css";
import image1 from "@assets/images/desk1.jpg";
import image2 from "@assets/images/desk2.jpg";
import image3 from "@assets/images/desk3.jpg";
import image4 from "@assets/images/desk4.jpg";
import image5 from "@assets/images/desk5.jpg";
import image6 from "@assets/images/desk6.jpg";
import image7 from "@assets/images/desk7.jpg";
import image8 from "@assets/images/desk8.jpg";

const images: CarouselImage[] = [
	{
		id: 1,
		format: "landscape",
		img: image1,
		alt: "Desk Image 1",
	},
	{
		id: 2,
		format: "portrait",
		img: image2,
		alt: "Desk Image 2",
	},
	{
		id: 3,
		format: "portrait",
		img: image3,
		alt: "Desk Image 3",
	},
	{
		id: 4,
		format: "landscape",
		img: image4,
		alt: "Desk Image 4",
	},
	{
		id: 5,
		format: "landscape",
		img: image5,
		alt: "Desk Image 5",
	},
	{
		id: 6,
		format: "landscape",
		img: image6,
		alt: "Desk Image 6",
	},
	{
		id: 7,
		format: "portrait",
		img: image7,
		alt: "Desk Image 7",
	},
	{
		id: 8,
		format: "landscape",
		img: image8,
		alt: "Desk Image 8",
	},
];

type UsesProps = {
	showHeader?: boolean;
};

const Uses: FC<UsesProps> = ({showHeader = true}) => {
	return (
		<section className={styles.container}>
			<div className={styles.usesContainer}>
				<div className={styles.textContainer}>
					{showHeader && (
						<a
							href="/uses"
							className={classNames("link", styles.usesLink)}
						>
							<h2
								id="usesTitle"
								className={classNames(styles.title)}
								data-content="Uses"
							>
								Uses
							</h2>
						</a>
					)}
				</div>
				<Carousel images={images} />
			</div>
		</section>
	);
};

export default Uses;
