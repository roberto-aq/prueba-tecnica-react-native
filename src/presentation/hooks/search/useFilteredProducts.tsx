import { useState, useEffect } from 'react';
import { Product } from '../../types/Product';

export const useFilteredProducts = (products: Product[]) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredProducts, setFilteredProducts] =
		useState<Product[]>(products);

	useEffect(() => {
		setFilteredProducts(
			products.filter(product =>
				product.name.toLowerCase().includes(searchTerm.toLowerCase())
			)
		);
	}, [searchTerm, products]);

	return { searchTerm, setSearchTerm, filteredProducts };
};
