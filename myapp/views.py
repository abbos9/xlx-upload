import pandas as pd
from django.shortcuts import render, redirect
import os

# View to process form data and save to an Excel file on the server
def process_form_data(request):
    if request.method == 'POST':
        # Extract data from POST request
        name = request.POST.get('name')
        email = request.POST.get('email')

        # Create a data dictionary to store the values
        data = {'Name': [name], 'Email': [email]}

        # Convert data to a DataFrame
        df = pd.DataFrame(data)

        # Define the path to save the Excel file
        excel_file_path = os.path.join(os.getcwd(), 'submitted_data.xlsx')


        # If the Excel file already exists, append new data to it
        if os.path.exists(excel_file_path):
            existing_df = pd.read_excel(excel_file_path)
            df = pd.concat([existing_df, df], ignore_index=True)

        # Save the DataFrame to an Excel file
        df.to_excel(excel_file_path, index=False, engine='openpyxl')

        # Redirect to a success page or display a success message
        return redirect('success')  # Redirect to a success page

    # Render the form template if request is not POST
    return render(request, 'test.html')

# View for the success page
def success(request):
    return render(request, 'success.html', {"message": "Data saved successfully!"})
