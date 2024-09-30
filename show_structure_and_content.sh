#!/bin/bash
# Output file
output_file="output.txt"

# Clear the file if it exists
> "$output_file"

# Display file structure without node_modules and save it to the file
tree -I node_modules -CL 6 >> "$output_file"

# Loop through each file excluding node_modules and append its content to the file
find . -type f \( -name "*.ts" -o -name "*.json" \) \
  ! -path "*/node_modules/*" | while read file; do
  echo "========================" >> "$output_file"
  echo "Content of $file" >> "$output_file"
  echo "========================" >> "$output_file"
  cat "$file" >> "$output_file"
  echo -e "\n" >> "$output_file"
done

echo "Output written to $output_file"
