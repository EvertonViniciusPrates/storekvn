create table products (
	id uuid primary key, 
	name Character varying (50),
	price numeric(6,2),
	description Character varying (100)
	
);


insert into products(name,id, price, description)values('Bulacha', '5d2180fa-a309-4036-9afe-5d25e686db80', 19.9, 'Negrito')