import type {FC} from "react";
import classNames from "classnames";
import Carousel, {type CarouselImage} from "@ui/react/carousel/Carousel";
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
					<div className={classNames(styles.content)}>
						<p>
							Building enterprise-grade frontend applications
							requires focus and an environment designed for deep
							work. My workspace is custom-built to stay clean,
							organized, and distraction-free.
						</p>
						<p>
							To maximize desk space, I designed and built an
							overhead support system that supports my studio
							monitors, camera, lighting, microphone, and other
							equipment. Keeping everything off the desk leaves a
							dedicated workspace for development and problem
							solving.
						</p>
						<p>
							Whether I'm building React and TypeScript
							applications, modernizing legacy frontends,
							reviewing architecture, or collaborating with remote
							teams, this setup is optimized for productive
							development and professional communication.
						</p>
					</div>
				</div>
				<Carousel images={images} />
			</div>
		</section>
	);
};

export default Uses;
