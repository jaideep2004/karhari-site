"use client";

import { useRef } from "react";
import "./styles/km10.css";
import { useGsapSection } from "./hooks/useGsapSection";
import { runKm10 } from "./scripts/km10";

export default function SectionKm10() {
	const ref = useRef<HTMLDivElement>(null);
	useGsapSection(runKm10, ref);

	return (
		<div className='km10-section' ref={ref}>
			<section className='karhari'>
				<div className='hero-backdrop'>
					<span className='hb-1'></span>
					<span className='hb-2'></span>
					<span className='hb-3'></span>
					<div className='hb-figs'>
						<i></i>
						<i></i>
						<i></i>
						<i></i>
						<i></i>
					</div>
				</div>
				<div className='container'>
					<div className='top-grid'>
						<div className='hero-col'>
							<div className='brand-label'>KARHARI MEDIA DISTRIBUTION</div>
							<h1 className='km10-hero-title'>
								<div>
									<span className='c-white'>ENTERTAINMENT &amp;</span>{" "}
									<span className='g-gold'>MUSIC</span>
									<span className='g-blue'>CMS.</span>
								</div>
								<div>
									<span className='c-white'>MULTI CHANNEL</span>{" "}
									<span className='g-pink'>ECOSYSTEM</span>
								</div>
							</h1>
							<p className='tagline'>
								MANAGE.&nbsp; PROTECT.&nbsp; MONETIZE.&nbsp; GROW.
							</p>
							<p className='hero-desc'>
								The all-in-one platform to manage thousands of entertainment
								&amp; music channels, protect your content and maximize your
								revenue.
							</p>
							<div className='stat-row' id='km10-heroStats'></div>
						</div>
						<div className='solutions-col reveal'>
							<h3>POWERFUL CMS &amp; MCN SOLUTIONS</h3>
							<div className='solutions-grid' id='km10-solutionsGrid'></div>
						</div>
					</div>
					<div className='main-grid'>
						<div className='features-col' id='km10-featuresCol'></div>
						<div className='orbit-col'>
							<div className='orbit-wrap' id='km10-orbitWrap'>
								<svg className='orbit-svg' id='km10-orbitSvg'></svg>
								<div className='orbit-center'>
									<div className='orbit-play'>
										<svg viewBox='0 0 24 24'>
											<path d='M8 5l12 7-12 7z' />
										</svg>
									</div>
								</div>
							</div>
						</div>
						<div className='network-col'>
							<div className='net-card reveal'>
								<h3>
									OUR NETWORK. <span className='g-pink'>THEIR SUCCESS.</span>
								</h3>
								<p className='sub'>
									Thousands of Channels. Millions of Fans. One Family.
								</p>
								<div className='world-map' id='km10-worldMap'></div>
								<div className='network-stats' id='km10-networkStats'></div>
							</div>
							<div className='net-card reveal'>
								<h3 className='grow-hdr'>
									WE HELP YOU GROW ON{" "}
									<span style={{ color: "var(--red)" }}>YOUTUBE</span> &amp;
									BEYOND
								</h3>
								<div className='grow-row' id='km10-growRow'></div>
							</div>
						</div>
					</div>
					<div className='how-section reveal'>
						<h2>HOW IT WORKS</h2>
						<div className='steps-row' id='km10-stepsRow'></div>
					</div>
					{/* <div className='footer-bar reveal'>
						<div className='footer-icons' id='km10-footerIcons'></div>
						<div className='footer-logo'>
							<div className='logo-block'>
								<div className='logo-badge'>
									<span>
										<svg
											viewBox='0 0 24 24'
											className='icon'
											style={{ stroke: "#fff" }}>
											<path d='M4 12v0M8 8v8M12 4v16M16 8v8M20 12v0' />
										</svg>
									</span>
								</div>
								<div>
									<div className='logo-title'>
										KARHARI <span>MEDIA</span>
									</div>
									<div className='logo-sub'>DISTRIBUTION</div>
								</div>
							</div>
							<div className='logo-tagline'>
								YOUR CONTENT. YOUR TECHNOLOGY. LIMITLESS GROWTH.
							</div>
						</div>
					</div> */}
				</div>
			</section>
		</div>
	);
}
