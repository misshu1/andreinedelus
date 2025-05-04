import type {FC} from "react";
import classNames from "classnames";
import Carousel, {
	type CarouselImage,
} from "@components/react/carousel/Carousel";
import styles from "./Uses.module.css";

type UsesProps = {
	images: CarouselImage[];
	showHeader?: boolean;
};

const Uses: FC<UsesProps> = ({showHeader = true, images}) => {
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
