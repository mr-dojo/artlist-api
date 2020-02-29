CREATE TYPE availability_options AS ENUM (
  'Available', 
  'Unavailable', 
  'Complicated');

ALTER TABLE artlist
ADD availability availability_options;