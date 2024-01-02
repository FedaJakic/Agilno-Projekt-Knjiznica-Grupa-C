import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
	return (
		<footer
			style={{
				backgroundColor: 'rgb(118 119 121)',
			}}
		>
			<Container>
				<Row>
					<Col>
						<ul className='list-unstyled mb-0 m-2 d-flex flex-row justify-content-center align-items-center'>
							<li>
								<a
									href='https://gkmm.hr/'
									target='_blank'
									rel='noreferrer'
									className='text-decoration-none fst-italic m-2'
									style={{
										color: '#db8a2c',
									}}
								>
									Naša stranica
								</a>
							</li>
							<li>
								<p
									className='m-2 fst-italic d-flex align-items-center'
									style={{
										color: '#db8a2c',
									}}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='22'
										height='22'
										fill='#324e5b'
										className='bi bi-phone-vibrate-fill m-1'
										viewBox='0 0 16 16'
									>
										<path d='M4 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4zm5 7a1 1 0 1 0-2 0 1 1 0 0 0 2 0zM1.807 4.734a.5.5 0 1 0-.884-.468A7.967 7.967 0 0 0 0 8c0 1.347.334 2.618.923 3.734a.5.5 0 1 0 .884-.468A6.967 6.967 0 0 1 1 8c0-1.18.292-2.292.807-3.266zm13.27-.468a.5.5 0 0 0-.884.468C14.708 5.708 15 6.819 15 8c0 1.18-.292 2.292-.807 3.266a.5.5 0 0 0 .884.468A7.967 7.967 0 0 0 16 8a7.967 7.967 0 0 0-.923-3.734zM3.34 6.182a.5.5 0 1 0-.93-.364A5.986 5.986 0 0 0 2 8c0 .769.145 1.505.41 2.182a.5.5 0 1 0 .93-.364A4.986 4.986 0 0 1 3 8c0-.642.12-1.255.34-1.818zm10.25-.364a.5.5 0 0 0-.93.364c.22.563.34 1.176.34 1.818 0 .642-.12 1.255-.34 1.818a.5.5 0 0 0 .93.364C13.856 9.505 14 8.769 14 8c0-.769-.145-1.505-.41-2.182z'></path>
									</svg>
									+385 21 685 000
								</p>
							</li>
							<li>
								<p
									className='m-2 fst-italic d-flex align-items-center'
									style={{
										color: '#db8a2c',
									}}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='16'
										height='16'
										fill='#324e5b'
										className='bi bi-envelope-paper-fill m-1'
										viewBox='0 0 16 16'
									>
										<path
											fillRule='evenodd'
											d='M6.5 9.5 3 7.5v-6A1.5 1.5 0 0 1 4.5 0h7A1.5 1.5 0 0 1 13 1.5v6l-3.5 2L8 8.75l-1.5.75ZM1.059 3.635 2 3.133v3.753L0 5.713V5.4a2 2 0 0 1 1.059-1.765ZM16 5.713l-2 1.173V3.133l.941.502A2 2 0 0 1 16 5.4v.313Zm0 1.16-5.693 3.337L16 13.372v-6.5Zm-8 3.199 7.941 4.412A2 2 0 0 1 14 16H2a2 2 0 0 1-1.941-1.516L8 10.072Zm-8 3.3 5.693-3.162L0 6.873v6.5Z'
										></path>
									</svg>
									gkmm@gkmm.hr
								</p>
							</li>
						</ul>
					</Col>
				</Row>

				<Row>
					<Col className='text-center py-1 fw-bold'>
						Copyright &copy; Agilno vođenje projekta
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
