import React from 'react';

const ActiveFilters = ({ authors, genres }) => {
	return (
		<>
			{authors && genres && <h4>Aktivni filteri</h4>}
			{authors && authors.map((author) => <p>{author}</p>)}
			{genres && genres.map((genre) => <p>{genre}</p>)}
		</>
	);
};

export default ActiveFilters;
