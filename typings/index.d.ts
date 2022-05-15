/// <reference path="./index.d.ts" />

export interface Link {
	url: string;
	html: string;
	bbcode: string;
	markdown: string;
	markdown_with_link: string;
	thumbnail_url: string;
}

export interface ImageInfo {
	id: number;
	size: number;
	width: number;
	height: number;
	human_date: string;
	date: string;
	url: string;
	thumb_url: string;
	filename: string;
	links: Link;
}

export interface Link {
	url?: any;
	label: string;
	active: boolean;
}

export interface Images {
	current_page: number;
	data: ImageInfo[];
	first_page_url: string;
	from: number;
	last_page: number;
	last_page_url: string;
	links: Link[];
	next_page_url?: any;
	path: string;
	per_page: number;
	prev_page_url?: any;
	to: number;
	total: number;
}

export interface Data {
	images: Images;
}

export interface BaseResponse {
	status: boolean;
	message: string;
	data: Data;
}
