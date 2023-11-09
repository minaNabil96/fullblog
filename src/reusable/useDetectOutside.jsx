import React, { useEffect, useState } from "react";

const useDetectOutside = (ref, id) => {
	const [outside, setOutside] = useState("none");
	useEffect(() => {
		const detectOutside = (e) => {
			if (
				e.target.id !== id &&
				ref.current &&
				!ref.current.contains(e.target)
			) {
				setOutside(true);
			} else {
				setOutside(false);
			}
		};

		document.addEventListener("click", detectOutside);
	}, [id, ref]);

	return outside;
};

export default useDetectOutside;
// openMenu ||
