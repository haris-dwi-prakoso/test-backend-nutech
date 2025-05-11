CREATE TABLE `railway`.`users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`email` VARCHAR(90) NOT NULL,
	`password` VARCHAR(90) NOT NULL,
	`first_name` VARCHAR(90) NOT NULL,
	`last_name` VARCHAR(90) NOT NULL,
	`profile_image` VARCHAR(90) NULL,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE
);

CREATE TABLE `railway`.`user_balances` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`balance` INT NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `userid_UNIQUE` (`user_id` ASC) VISIBLE,
	CONSTRAINT `balance_userid`
		FOREIGN KEY (`user_id`)
		REFERENCES `railway`.`users` (`id`)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
);

CREATE TABLE `railway`.`banners` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`banner_name` VARCHAR(90) NULL,
	`banner_image` VARCHAR(90) NULL,
	`description` VARCHAR(90) NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `railway`.`services` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`service_code` VARCHAR(90) NOT NULL,
	`service_name` VARCHAR(90) NOT NULL,
	`service_icon` VARCHAR(90) NULL,
	`service_tariff` INT NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `service_code_UNIQUE` (`service_code` ASC) VISIBLE,
	UNIQUE INDEX `service_name_UNIQUE` (`service_name` ASC) VISIBLE
);

CREATE TABLE `railway`.`transactions` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`invoice_number` VARCHAR(45) NOT NULL,
	`user_id` INT NOT NULL,
	`transaction_type` VARCHAR(45) NOT NULL,
	`description` VARCHAR(90) NULL,
	`total_amount` INT NOT NULL,
	`created_on` DATETIME NOT NULL DEFAULT NOW(),
	PRIMARY KEY (`id`),
	UNIQUE INDEX `invoice_number_UNIQUE` (`invoice_number` ASC) VISIBLE,
	INDEX `userid_idx` (`user_id` ASC) VISIBLE,
	CONSTRAINT `transaction_userid`
		FOREIGN KEY (`user_id`)
		REFERENCES `railway`.`users` (`id`)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
);