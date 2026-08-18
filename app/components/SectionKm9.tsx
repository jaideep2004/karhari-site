"use client";

import { useRef } from "react";
import "./styles/km9.css";
import { useGsapSection } from "./hooks/useGsapSection";
import { runKm9 } from "./scripts/km9";

export default function SectionKm9() {
	const ref = useRef<HTMLDivElement>(null);
	useGsapSection(runKm9, ref);

	return (
		<div id='rights-protection' className='km9-section' ref={ref}>
			<section className='km9-hero'>
				<div className='bg-glow bg-glow-1'></div>
				<div className='bg-glow bg-glow-2'></div>
				<div className='bg-particles' id='km9-bgParticles'></div>
				<div className='km9-hero-container'>
					<div className='col col-left'>
						<div className='brand'>
							<h1 className='logo-text'>
								KARHARI <span>MEDIA</span>
							</h1>
							<p className='tagline'>
								YOUR MUSIC. YOUR RIGHTS. OUR PROTECTION.
							</p>
						</div>
						<h2 className='headline'>
							<span className='grad-orange'>MANAGE, PROTECT</span> &amp;{" "}
							<span className='grad-blue'>MAXIMIZE</span> YOUR MUSIC RIGHTS{" "}
						</h2>
						<p className='desc'>
							{" "}
							Karhari Media empowers <b>Artists</b>, <b>Song Writers</b>,{" "}
							<b>Singers</b>, <b>Music Composers</b>, <b>Record Labels</b> and{" "}
							<b>Rights Owners</b> to manage, protect, and monetize their music
							and music videos worldwide.{" "}
						</p>
						<div className='feature-icons'>
							<div className='feature-item' data-color='purple'>
								<div className='icon-circle'>🛡️</div>
								<h4>PROTECT</h4>
								<p>Protect your copyrights worldwide</p>
							</div>
							<div className='feature-item' data-color='blue'>
								<div className='icon-circle'>🔍</div>
								<h4>MONITOR</h4>
								<p>Real-time monitoring across platforms</p>
							</div>
							<div className='feature-item' data-color='green'>
								<div className='icon-circle'>📈</div>
								<h4>MONETIZE</h4>
								<p>Collect every royalty you deserve</p>
							</div>
							<div className='feature-item' data-color='orange'>
								<div className='icon-circle'>👤</div>
								<h4>MANAGE</h4>
								<p>Full control of your music rights</p>
							</div>
						</div>
					</div>
					<div className='col col-center'>
						<div className='center-label'>
							<h3>COPYRIGHT PROTECTION</h3>
							<p>We protect your rights through</p>
						</div>
						<div className='shield-stage' id='km9-shieldStage'>
							<svg
								className='connections'
								viewBox='0 0 100 100'
								preserveAspectRatio='none'>
								<defs>
									<linearGradient
										id='km9-lineGrad'
										x1='0%'
										y1='0%'
										x2='100%'
										y2='100%'>
										<stop offset='0%' stopColor='#a855f7' />
										<stop offset='100%' stopColor='#3b82f6' />
									</linearGradient>
								</defs>
								<path
									id='km9-path1'
									className='conn-path'
									d='M12,10 Q30,30 50,46'
								/>
								<path
									id='km9-path2'
									className='conn-path'
									d='M88,10 Q70,30 50,46'
								/>
								<path
									id='km9-path3'
									className='conn-path'
									d='M12,62 Q30,55 50,46'
								/>
								<path
									id='km9-path4'
									className='conn-path'
									d='M88,62 Q70,55 50,46'
								/>
							</svg>
							<div
								className='pulse-dot'
								style={{ background: "#ff0000" }}></div>
							<div
								className='pulse-dot'
								style={{ background: "#3b82f6" }}></div>
							<div
								className='pulse-dot'
								style={{ background: "#ec4899" }}></div>
							<div
								className='pulse-dot'
								style={{ background: "#f97316" }}></div>
							<div className='note note-1'>🎵</div>
							<div className='note note-2'>🎵</div>
							<div className='note note-3'>🎵</div>
							<div className='platform-node node-youtube'>
								<div className='node-circle yt'>
									<img
										src='/assets/images/Karhari_Media_Distribution__1_-1786796406212.png'
										alt='YouTube'
									/>
								</div>
								<span className='node-label'>
									YOUTUBE
									<br />
									<small>CONTENT ID</small>
								</span>
								<p className='node-desc'>
									We protect your music with YouTube Content ID
								</p>
							</div>
							<div className='platform-node node-facebook'>
								<div className='node-circle fb'>
									<img
										src='https://cms.karharimedia.com/images/dsp/facebook.png'
										alt='Facebook'
									/>
								</div>
								<span className='node-label'>
									FACEBOOK
									<br />
									<small>RIGHTS MANAGER</small>
								</span>
								<p className='node-desc'>
									We protect your content across Facebook platforms
								</p>
							</div>
							<div className='platform-node node-tiktok'>
								<div className='node-circle tt'>
									<img
										src='https://cms.karharimedia.com/images/dsp/tiktok-music-library.png'
										alt='TikTok'
									/>
								</div>
								<span className='node-label'>
									TIKTOK
									<br />
									<small>RIGHTS PROTECTION</small>
								</span>
								<p className='node-desc'>
									We protect your music on TikTok UGC platform
								</p>
							</div>
							<div className='platform-node node-soundcloud'>
								<div className='node-circle sc'>
									<img
										src='https://cms.karharimedia.com/images/dsp/soundcloud.png'
										alt='SoundCloud'
									/>
								</div>
								<span className='node-label'>
									SOUNDCLOUD
									<br />
									<small>CONTENT ID</small>
								</span>
								<p className='node-desc'>
									We protect your music on SoundCloud UGC platform
								</p>
							</div>
							<div className='shield-wrap'>
								<div className='ring ring-1'></div>
								<div className='ring ring-2'></div>
								<div className='ring ring-3'></div>
								<div className='particles-float' id='km9-shieldParticles'></div>
								<div className='lock-badge'>
									<span>🔒</span>
								</div>
								<div className='shield-core'>
									<div className='shield-glow'></div>
									<div className='light-beam'></div>
									<svg
										className='shield-svg'
										viewBox='0 0 100 112'
										xmlns='http://www.w3.org/2000/svg'>
										<defs>
											<linearGradient
												id='km9-shieldGrad'
												x1='0%'
												y1='50%'
												x2='100%'
												y2='50%'>
												<stop offset='0%' stopColor='#ec4899' />
												<stop offset='14%' stopColor='#c026d3' />
												<stop offset='34%' stopColor='#9333ea' />
												<stop offset='58%' stopColor='#6d5bf5' />
												<stop offset='80%' stopColor='#4f6cf7' />
												<stop offset='100%' stopColor='#3b82f6' />
											</linearGradient>
											<linearGradient
												id='km9-shieldShine'
												x1='0%'
												y1='0%'
												x2='100%'
												y2='0%'>
												<stop offset='0%' stopColor='#ffffff' stopOpacity='0' />
												<stop
													offset='20%'
													stopColor='#ffffff'
													stopOpacity='0'
												/>
												<stop
													offset='30%'
													stopColor='#ffffff'
													stopOpacity='0.15'
												/>
												<stop
													offset='37%'
													stopColor='#ffffff'
													stopOpacity='0.75'
												/>
												<stop
													offset='44%'
													stopColor='#ffffff'
													stopOpacity='0.15'
												/>
												<stop
													offset='55%'
													stopColor='#ffffff'
													stopOpacity='0'
												/>
												<stop
													offset='100%'
													stopColor='#ffffff'
													stopOpacity='0'
												/>
											</linearGradient>
											<linearGradient
												id='km9-topGloss'
												x1='0%'
												y1='0%'
												x2='0%'
												y2='100%'>
												<stop
													offset='0%'
													stopColor='#ffffff'
													stopOpacity='0.5'
												/>
												<stop
													offset='100%'
													stopColor='#ffffff'
													stopOpacity='0'
												/>
											</linearGradient>
											<radialGradient
												id='km9-emblemGlow'
												cx='50%'
												cy='45%'
												r='60%'>
												<stop
													offset='0%'
													stopColor='#ffffff'
													stopOpacity='0.85'
												/>
												<stop
													offset='100%'
													stopColor='#ffffff'
													stopOpacity='0'
												/>
											</radialGradient>
											<clipPath id='km9-shieldClip'>
												<path
													d='M20,8
                                                       Q50,3 80,8
                                                       C89,11 92,17 92,26
                                                       L92,42
                                                       C92,72 75,91 50,108
                                                       C25,91 8,72 8,42
                                                       L8,26
                                                       C8,17 11,11 20,8 Z'
												/>
											</clipPath>
										</defs>
										<path
											id='km9-shieldPath'
											d='M20,8
                                             Q50,3 80,8
                                             C89,11 92,17 92,26
                                             L92,42
                                             C92,72 75,91 50,108
                                             C25,91 8,72 8,42
                                             L8,26
                                             C8,17 11,11 20,8 Z'
											fill='url(#km9-shieldGrad)'
											stroke='#141034'
											strokeWidth='2.4'
											strokeLinejoin='round'
										/>
										<rect
											x='8'
											y='3'
											width='84'
											height='105'
											fill='url(#km9-shieldShine)'
											clipPath='url(#km9-shieldClip)'
										/>
										<path
											d='M20,8 Q50,3 80,8 C89,11 92,17 92,26 L92,34 C74,25 26,25 8,34 L8,26 C8,17 11,11 20,8 Z'
											fill='url(#km9-topGloss)'
											clipPath='url(#km9-shieldClip)'
											opacity='0.85'
										/>
										<path
											d='M26,15
                                               Q50,11 74,15
                                               C81,17.5 84,22 84,29
                                               L84,42
                                               C84,64 71,80 50,95
                                               C29,80 16,64 16,42
                                               L16,29
                                               C16,22 19,17.5 26,15 Z'
											fill='none'
											stroke='#ffffff'
											strokeOpacity='0.35'
											strokeWidth='1'
										/>
										<path
											d='M20,8
                                               Q50,3 80,8
                                               C89,11 92,17 92,26
                                               L92,42
                                               C92,72 75,91 50,108
                                               C25,91 8,72 8,42
                                               L8,26
                                               C8,17 11,11 20,8 Z'
											fill='none'
											stroke='#ffffff'
											strokeOpacity='0.5'
											strokeWidth='1'
										/>
										<circle
											cx='50'
											cy='54'
											r='23'
											fill='url(#km9-emblemGlow)'
											opacity='0.5'
										/>
										<circle
											cx='50'
											cy='54'
											r='21.5'
											fill='rgba(8,8,22,0.15)'
											stroke='#ffffff'
											strokeWidth='4.2'
										/>
										<text
											x='50'
											y='65'
											textAnchor='middle'
											fontFamily='Arial, Helvetica, sans-serif'
											fontSize='28'
											fontWeight='900'
											fill='#ffffff'>
											C
										</text>
									</svg>
								</div>
							</div>
							<div className='pedestal'>
								<div className='ped-part ped-cap ped-bottom t1'></div>
								<div className='ped-part ped-wall t1'></div>
								<div className='ped-part ped-cap ped-top t1'></div>
								<div className='ped-part ped-cap ped-bottom t2'></div>
								<div className='ped-part ped-wall t2'></div>
								<div className='ped-part ped-cap ped-top t2'></div>
								<div className='ped-part ped-cap ped-bottom t3'></div>
								<div className='ped-part ped-wall t3'></div>
								<div className='ped-part ped-cap ped-top t3'></div>
								<div className='ped-reflection'></div>
								<div className='ped-glow'></div>
							</div>
						</div>
						<div className='global-coverage'>
							<span>🌐 GLOBAL COVERAGE</span>
							<p>One Partner. All Platforms. Worldwide Protection.</p>
						</div>
					</div>
					<div className='col col-right'>
						<h3 className='right-heading'>
							{" "}
							DISTRIBUTE &amp; MANAGE RIGHTS ON
							<br />
							<span className='grad-pink'>GLOBAL MUSIC PLATFORMS</span>
						</h3>
						<div className='platform-logos'>
							<div className='logo-item'>
								<div className='logo-circle spotify'>
									<img
										src='https://cms.karharimedia.com/images/dsp/spotify.png'
										alt='Spotify'
									/>
								</div>
								<span>Spotify</span>
							</div>
							<div className='logo-item'>
								<div className='logo-circle apple'>
									<img
										src='https://cms.karharimedia.com/images/dsp/applemusic.png'
										alt='Apple Music'
									/>
								</div>
								<span>Apple Music</span>
							</div>
							<div className='logo-item'>
								<div className='logo-circle amazon'>
									<img
										src='https://cms.karharimedia.com/images/dsp/amazonmusic.png'
										alt='Amazon Music'
									/>
								</div>
								<span>Amazon Music</span>
							</div>
							<div className='logo-item'>
								<div className='logo-circle ytmusic'>
									<img
										src='https://cms.karharimedia.com/images/dsp/ytmusic.png'
										alt='YouTube Music'
									/>
								</div>
								<span>YouTube Music</span>
							</div>
						</div>
						<p className='more-platforms'>
							&amp; Many More Platforms Worldwide 🌐
						</p>
						<div className='glass-panel why-choose'>
							<h4>
								WHY CHOOSE <span className='grad-blue'>KARHARI MEDIA?</span>
							</h4>
							<div className='why-item'>
								<div className='why-icon'>🛡️</div>
								<div>
									<h5>Copyright Protection</h5>
									<p>
										Advanced technology to detect &amp; protect your content
										globally.
									</p>
								</div>
							</div>
							<div className='why-item'>
								<div className='why-icon'>📊</div>
								<div>
									<h5>Real-Time Monitoring</h5>
									<p>Track usage, performance &amp; revenue in real-time.</p>
								</div>
							</div>
							<div className='why-item'>
								<div className='why-icon'>💲</div>
								<div>
									<h5>Fair &amp; Transparent</h5>
									<p>
										100% transparent royalty tracking &amp; fair revenue
										distribution.
									</p>
								</div>
							</div>
							<div className='why-item'>
								<div className='why-icon'>🎧</div>
								<div>
									<h5>Dedicated Support</h5>
									<p>Our expert team is always here to support you.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				
			</section>
		</div>
	);
}
