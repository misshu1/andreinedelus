const URL = `https://www.instagram.com/graphql/query/?query_hash=${process.env.INSTAGRAM_QUERY_HASH}&variables={"id":${process.env.INSTAGRAM_ID},"first":8}`;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 1 day
const CACHE: CachePost = {
	LAST_FETCH: 0,
	POSTS: [],
};

function formatData(response: InstagramResponse): Post[] {
	return response.data.user.edge_owner_to_timeline_media.edges.map(edge => ({
		image: edge.node.thumbnail_src,
		thumbnail: edge.node.thumbnail_resources[2].src,
		url: `https://instagram.com/p/${edge.node.shortcode}`,
		description:
			edge.node.edge_media_to_caption.edges.length > 0
				? edge.node.edge_media_to_caption.edges[0].node.text
				: null,
		id: edge.node.id,
	}));
}

async function getPosts() {
	const timeSinceLAST_FETCH = Date.now() - CACHE.LAST_FETCH;
	// Check the cache
	if (timeSinceLAST_FETCH <= CACHE_DURATION) {
		return new Response(JSON.stringify({posts: CACHE.POSTS}), {
			status: 200,
		});
	}
	const response = await fetch(URL).then(res => res);

	if (response.ok) {
		const data = await response.json();
		try {
			const posts = formatData(data);
			CACHE.LAST_FETCH = Date.now();
			CACHE.POSTS = posts;
			return new Response(JSON.stringify({posts}), {status: 200});
		} catch (error) {
			return new Response(JSON.stringify({message: "Fail."}), {
				status: 500,
			});
		}
	} else {
		return new Response(JSON.stringify({message: "Fail."}), {
			status: 500,
		});
	}
}
export default getPosts;

interface Post {
	image: string;
	thumbnail: string;
	url: string;
	description: string | null;
	id: string;
}

interface CachePost {
	LAST_FETCH: number;
	POSTS: Post[];
}

interface InstagramResponse {
	data: Data;
	extensions: Extensions;
	status: string;
}

interface Data {
	user: User;
}

interface User {
	edge_owner_to_timeline_media: EdgeOwnerToTimelineMedia;
}

interface EdgeOwnerToTimelineMedia {
	count: number;
	page_info: PageInfo;
	edges: Edge[];
}

interface PageInfo {
	has_next_page: boolean;
	end_cursor: string;
}

interface Edge {
	node: Node;
}

interface Node {
	__typename: string;
	id: string;
	dimensions: Dimensions;
	display_url: string;
	display_resources: DisplayResource[];
	is_video: boolean;
	tracking_token: string;
	edge_media_to_tagged_user: EdgeMediaToTaggedUser;
	accessibility_caption: any;
	edge_media_to_caption: EdgeMediaToCaption;
	shortcode: string;
	edge_media_to_comment: EdgeMediaToComment;
	edge_media_to_sponsor_user: EdgeMediaToSponsorUser;
	comments_disabled: boolean;
	taken_at_timestamp: number;
	edge_media_preview_like: EdgeMediaPreviewLike;
	gating_info: any;
	fact_check_overall_rating: any;
	fact_check_information: any;
	media_preview?: string;
	owner: Owner;
	location: Location;
	viewer_has_liked: boolean;
	viewer_has_saved: boolean;
	viewer_has_saved_to_collection: boolean;
	viewer_in_photo_of_you: boolean;
	viewer_can_reshare: boolean;
	thumbnail_src: string;
	thumbnail_resources: ThumbnailResource[];
	edge_sidecar_to_children?: EdgeSidecarToChildren;
}

interface Dimensions {
	height: number;
	width: number;
}

interface DisplayResource {
	src: string;
	config_width: number;
	config_height: number;
}

interface EdgeMediaToTaggedUser {
	edges: any[];
}

interface EdgeMediaToCaption {
	edges: Edge2[];
}

interface Edge2 {
	node: Node2;
}

interface Node2 {
	text: string;
}

interface EdgeMediaToComment {
	count: number;
	page_info: PageInfo2;
	edges?: any[];
	eedges?: any[];
}

interface PageInfo2 {
	has_next_page: boolean;
	end_cursor: any;
}

interface EdgeMediaToSponsorUser {
	edges: any[];
}

interface EdgeMediaPreviewLike {
	count: number;
	edges: any[];
}

interface Owner {
	id: string;
	username: string;
}

interface Location {
	id: string;
	has_public_page: boolean;
	name: string;
	slug: string;
}

interface ThumbnailResource {
	src: string;
	config_width: number;
	config_height: number;
}

interface EdgeSidecarToChildren {
	edges: Edge3[];
}

interface Edge3 {
	node: Node3;
}

interface Node3 {
	__typename: string;
	id: string;
	dimensions: Dimensions2;
	display_url: string;
	display_resources: DisplayResource2[];
	is_video: boolean;
	tracking_token: string;
	edge_media_to_tagged_user: EdgeMediaToTaggedUser2;
	accessibility_caption: any;
}

interface Dimensions2 {
	height: number;
	width: number;
}

interface DisplayResource2 {
	src: string;
	config_width: number;
	config_height: number;
}

interface EdgeMediaToTaggedUser2 {
	edges: any[];
}

interface Extensions {
	is_final: boolean;
}
