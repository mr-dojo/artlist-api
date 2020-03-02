CREATE TYPE availability_options AS ENUM (
  'Available', 
  'Unavailable', 
  'Complicated');

ALTER TABLE list
ADD availability availability_options;