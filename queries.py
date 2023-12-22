create_primary_table =  """CREATE TABLE IF NOT EXISTS data (
    batch_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    device VARCHAR(255),
    timestamp DATETIME
);
"""

create_second_table = """CREATE TABLE IF NOT EXISTS ImageTable (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    batch_id BIGINT UNSIGNED,
    description TEXT,
    category VARCHAR(255),
    base64_image TEXT,
    FOREIGN KEY (batch_id) REFERENCES data(batch_id)
);
"""

create_description_table = """CREATE TABLE IF NOT EXISTS descriptionTable (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp DATETIME,
    user TEXT,
    summary TEXT,
);
"""