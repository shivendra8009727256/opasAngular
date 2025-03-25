import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ShareDataService } from '../../share-data.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-profile',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,MatSelectModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  // Add to your component class
  countryCodes = [
    { name: 'Afghanistan', dial_code: '+93', code: 'AF' },
    { name: 'Albania', dial_code: '+355', code: 'AL' },
    { name: 'Algeria', dial_code: '+213', code: 'DZ' },
    { name: 'American Samoa', dial_code: '+1 684', code: 'AS' },
    { name: 'Andorra', dial_code: '+376', code: 'AD' },
    { name: 'Angola', dial_code: '+244', code: 'AO' },
    { name: 'Anguilla', dial_code: '+1 264', code: 'AI' },
    { name: 'Antigua and Barbuda', dial_code: '+1 268', code: 'AG' },
    { name: 'Argentina', dial_code: '+54', code: 'AR' },
    { name: 'Armenia', dial_code: '+374', code: 'AM' },
    { name: 'Aruba', dial_code: '+297', code: 'AW' },
    { name: 'Australia', dial_code: '+61', code: 'AU' },
    { name: 'Austria', dial_code: '+43', code: 'AT' },
    { name: 'Azerbaijan', dial_code: '+994', code: 'AZ' },
    { name: 'Bahamas', dial_code: '+1 242', code: 'BS' },
    { name: 'Bahrain', dial_code: '+973', code: 'BH' },
    { name: 'Bangladesh', dial_code: '+880', code: 'BD' },
    { name: 'Barbados', dial_code: '+1 246', code: 'BB' },
    { name: 'Belarus', dial_code: '+375', code: 'BY' },
    { name: 'Belgium', dial_code: '+32', code: 'BE' },
    { name: 'Belize', dial_code: '+501', code: 'BZ' },
    { name: 'Benin', dial_code: '+229', code: 'BJ' },
    { name: 'Bermuda', dial_code: '+1 441', code: 'BM' },
    { name: 'Bhutan', dial_code: '+975', code: 'BT' },
    { name: 'Bolivia', dial_code: '+591', code: 'BO' },
    { name: 'Bosnia and Herzegovina', dial_code: '+387', code: 'BA' },
    { name: 'Botswana', dial_code: '+267', code: 'BW' },
    { name: 'Brazil', dial_code: '+55', code: 'BR' },
    { name: 'British Indian Ocean Territory', dial_code: '+246', code: 'IO' },
    { name: 'British Virgin Islands', dial_code: '+1 284', code: 'VG' },
    { name: 'Brunei', dial_code: '+673', code: 'BN' },
    { name: 'Bulgaria', dial_code: '+359', code: 'BG' },
    { name: 'Burkina Faso', dial_code: '+226', code: 'BF' },
    { name: 'Burundi', dial_code: '+257', code: 'BI' },
    { name: 'Cambodia', dial_code: '+855', code: 'KH' },
    { name: 'Cameroon', dial_code: '+237', code: 'CM' },
    { name: 'Canada', dial_code: '+1', code: 'CA' },
    { name: 'Cape Verde', dial_code: '+238', code: 'CV' },
    { name: 'Cayman Islands', dial_code: '+1 345', code: 'KY' },
    { name: 'Central African Republic', dial_code: '+236', code: 'CF' },
    { name: 'Chad', dial_code: '+235', code: 'TD' },
    { name: 'Chile', dial_code: '+56', code: 'CL' },
    { name: 'China', dial_code: '+86', code: 'CN' },
    { name: 'Colombia', dial_code: '+57', code: 'CO' },
    { name: 'Comoros', dial_code: '+269', code: 'KM' },
    { name: 'Cook Islands', dial_code: '+682', code: 'CK' },
    { name: 'Costa Rica', dial_code: '+506', code: 'CR' },
    { name: 'Croatia', dial_code: '+385', code: 'HR' },
    { name: 'Cuba', dial_code: '+53', code: 'CU' },
    { name: 'Curacao', dial_code: '+599', code: 'CW' },
    { name: 'Cyprus', dial_code: '+357', code: 'CY' },
    { name: 'Czech Republic', dial_code: '+420', code: 'CZ' },
    { name: 'Democratic Republic of the Congo', dial_code: '+243', code: 'CD' },
    { name: 'Denmark', dial_code: '+45', code: 'DK' },
    { name: 'Djibouti', dial_code: '+253', code: 'DJ' },
    { name: 'Dominica', dial_code: '+1 767', code: 'DM' },
    { name: 'Dominican Republic', dial_code: '+1 809', code: 'DO' },
    { name: 'Ecuador', dial_code: '+593', code: 'EC' },
    { name: 'Egypt', dial_code: '+20', code: 'EG' },
    { name: 'El Salvador', dial_code: '+503', code: 'SV' },
    { name: 'Equatorial Guinea', dial_code: '+240', code: 'GQ' },
    { name: 'Eritrea', dial_code: '+291', code: 'ER' },
    { name: 'Estonia', dial_code: '+372', code: 'EE' },
    { name: 'Eswatini', dial_code: '+268', code: 'SZ' },
    { name: 'Ethiopia', dial_code: '+251', code: 'ET' },
    { name: 'Falkland Islands', dial_code: '+500', code: 'FK' },
    { name: 'Faroe Islands', dial_code: '+298', code: 'FO' },
    { name: 'Fiji', dial_code: '+679', code: 'FJ' },
    { name: 'Finland', dial_code: '+358', code: 'FI' },
    { name: 'France', dial_code: '+33', code: 'FR' },
    { name: 'French Polynesia', dial_code: '+689', code: 'PF' },
    { name: 'Gabon', dial_code: '+241', code: 'GA' },
    { name: 'Gambia', dial_code: '+220', code: 'GM' },
    { name: 'Georgia', dial_code: '+995', code: 'GE' },
    { name: 'Germany', dial_code: '+49', code: 'DE' },
    { name: 'Ghana', dial_code: '+233', code: 'GH' },
    { name: 'Gibraltar', dial_code: '+350', code: 'GI' },
    { name: 'Greece', dial_code: '+30', code: 'GR' },
    { name: 'Greenland', dial_code: '+299', code: 'GL' },
    { name: 'Grenada', dial_code: '+1 473', code: 'GD' },
    { name: 'Guam', dial_code: '+1 671', code: 'GU' },
    { name: 'Guatemala', dial_code: '+502', code: 'GT' },
    { name: 'Guernsey', dial_code: '+44', code: 'GG' },
    { name: 'Guinea', dial_code: '+224', code: 'GN' },
    { name: 'Guinea-Bissau', dial_code: '+245', code: 'GW' },
    { name: 'Guyana', dial_code: '+592', code: 'GY' },
    { name: 'Haiti', dial_code: '+509', code: 'HT' },
    { name: 'Honduras', dial_code: '+504', code: 'HN' },
    { name: 'Hong Kong', dial_code: '+852', code: 'HK' },
    { name: 'Hungary', dial_code: '+36', code: 'HU' },
    { name: 'Iceland', dial_code: '+354', code: 'IS' },
    { name: 'India', dial_code: '+91', code: 'IN' },
    { name: 'Indonesia', dial_code: '+62', code: 'ID' },
    { name: 'Iran', dial_code: '+98', code: 'IR' },
    { name: 'Iraq', dial_code: '+964', code: 'IQ' },
    { name: 'Ireland', dial_code: '+353', code: 'IE' },
    { name: 'Isle of Man', dial_code: '+44', code: 'IM' },
    { name: 'Israel', dial_code: '+972', code: 'IL' },
    { name: 'Italy', dial_code: '+39', code: 'IT' },
    { name: 'Ivory Coast', dial_code: '+225', code: 'CI' },
    { name: 'Jamaica', dial_code: '+1 876', code: 'JM' },
    { name: 'Japan', dial_code: '+81', code: 'JP' },
    { name: 'Jersey', dial_code: '+44', code: 'JE' },
    { name: 'Jordan', dial_code: '+962', code: 'JO' },
    { name: 'Kazakhstan', dial_code: '+7', code: 'KZ' },
    { name: 'Kenya', dial_code: '+254', code: 'KE' },
    { name: 'Kiribati', dial_code: '+686', code: 'KI' },
    { name: 'Kosovo', dial_code: '+383', code: 'XK' },
    { name: 'Kuwait', dial_code: '+965', code: 'KW' },
    { name: 'Kyrgyzstan', dial_code: '+996', code: 'KG' },
    { name: 'Laos', dial_code: '+856', code: 'LA' },
    { name: 'Latvia', dial_code: '+371', code: 'LV' },
    { name: 'Lebanon', dial_code: '+961', code: 'LB' },
    { name: 'Lesotho', dial_code: '+266', code: 'LS' },
    { name: 'Liberia', dial_code: '+231', code: 'LR' },
    { name: 'Libya', dial_code: '+218', code: 'LY' },
    { name: 'Liechtenstein', dial_code: '+423', code: 'LI' },
    { name: 'Lithuania', dial_code: '+370', code: 'LT' },
    { name: 'Luxembourg', dial_code: '+352', code: 'LU' },
    { name: 'Macau', dial_code: '+853', code: 'MO' },
    { name: 'Madagascar', dial_code: '+261', code: 'MG' },
    { name: 'Malawi', dial_code: '+265', code: 'MW' },
    { name: 'Malaysia', dial_code: '+60', code: 'MY' },
    { name: 'Maldives', dial_code: '+960', code: 'MV' },
    { name: 'Mali', dial_code: '+223', code: 'ML' },
    { name: 'Malta', dial_code: '+356', code: 'MT' },
    { name: 'Marshall Islands', dial_code: '+692', code: 'MH' },
    { name: 'Mauritania', dial_code: '+222', code: 'MR' },
    { name: 'Mauritius', dial_code: '+230', code: 'MU' },
    { name: 'Mayotte', dial_code: '+262', code: 'YT' },
    { name: 'Mexico', dial_code: '+52', code: 'MX' },
    { name: 'Micronesia', dial_code: '+691', code: 'FM' },
    { name: 'Moldova', dial_code: '+373', code: 'MD' },
    { name: 'Monaco', dial_code: '+377', code: 'MC' },
    { name: 'Mongolia', dial_code: '+976', code: 'MN' },
    { name: 'Montenegro', dial_code: '+382', code: 'ME' },
    { name: 'Montserrat', dial_code: '+1 664', code: 'MS' },
    { name: 'Morocco', dial_code: '+212', code: 'MA' },
    { name: 'Mozambique', dial_code: '+258', code: 'MZ' },
    { name: 'Myanmar', dial_code: '+95', code: 'MM' },
    { name: 'Namibia', dial_code: '+264', code: 'NA' },
    { name: 'Nauru', dial_code: '+674', code: 'NR' },
    { name: 'Nepal', dial_code: '+977', code: 'NP' },
    { name: 'Netherlands', dial_code: '+31', code: 'NL' },
    { name: 'New Caledonia', dial_code: '+687', code: 'NC' },
    { name: 'New Zealand', dial_code: '+64', code: 'NZ' },
    { name: 'Nicaragua', dial_code: '+505', code: 'NI' },
    { name: 'Niger', dial_code: '+227', code: 'NE' },
    { name: 'Nigeria', dial_code: '+234', code: 'NG' },
    { name: 'Niue', dial_code: '+683', code: 'NU' },
    { name: 'North Korea', dial_code: '+850', code: 'KP' },
    { name: 'North Macedonia', dial_code: '+389', code: 'MK' },
    { name: 'Northern Mariana Islands', dial_code: '+1 670', code: 'MP' },
    { name: 'Norway', dial_code: '+47', code: 'NO' },
    { name: 'Oman', dial_code: '+968', code: 'OM' },
    { name: 'Pakistan', dial_code: '+92', code: 'PK' },
    { name: 'Palau', dial_code: '+680', code: 'PW' },
    { name: 'Palestine', dial_code: '+970', code: 'PS' },
    { name: 'Panama', dial_code: '+507', code: 'PA' },
    { name: 'Papua New Guinea', dial_code: '+675', code: 'PG' },
    { name: 'Paraguay', dial_code: '+595', code: 'PY' },
    { name: 'Peru', dial_code: '+51', code: 'PE' },
    { name: 'Philippines', dial_code: '+63', code: 'PH' },
    { name: 'Poland', dial_code: '+48', code: 'PL' },
    { name: 'Portugal', dial_code: '+351', code: 'PT' },
    { name: 'Puerto Rico', dial_code: '+1 787', code: 'PR' },
    { name: 'Qatar', dial_code: '+974', code: 'QA' },
    { name: 'Republic of the Congo', dial_code: '+242', code: 'CG' },
    { name: 'Reunion', dial_code: '+262', code: 'RE' },
    { name: 'Romania', dial_code: '+40', code: 'RO' },
    { name: 'Russia', dial_code: '+7', code: 'RU' },
    { name: 'Rwanda', dial_code: '+250', code: 'RW' },
    { name: 'Saint Barthelemy', dial_code: '+590', code: 'BL' },
    { name: 'Saint Helena', dial_code: '+290', code: 'SH' },
    { name: 'Saint Kitts and Nevis', dial_code: '+1 869', code: 'KN' },
    { name: 'Saint Lucia', dial_code: '+1 758', code: 'LC' },
    { name: 'Saint Martin', dial_code: '+590', code: 'MF' },
    { name: 'Saint Pierre and Miquelon', dial_code: '+508', code: 'PM' },
    { name: 'Saint Vincent and the Grenadines', dial_code: '+1 784', code: 'VC' },
    { name: 'Samoa', dial_code: '+685', code: 'WS' },
    { name: 'San Marino', dial_code: '+378', code: 'SM' },
    { name: 'Sao Tome and Principe', dial_code: '+239', code: 'ST' },
    { name: 'Saudi Arabia', dial_code: '+966', code: 'SA' },
    { name: 'Senegal', dial_code: '+221', code: 'SN' },
    { name: 'Serbia', dial_code: '+381', code: 'RS' },
    { name: 'Seychelles', dial_code: '+248', code: 'SC' },
    { name: 'Sierra Leone', dial_code: '+232', code: 'SL' },
    { name: 'Singapore', dial_code: '+65', code: 'SG' },
    { name: 'Sint Maarten', dial_code: '+1 721', code: 'SX' },
    { name: 'Slovakia', dial_code: '+421', code: 'SK' },
    { name: 'Slovenia', dial_code: '+386', code: 'SI' },
    { name: 'Solomon Islands', dial_code: '+677', code: 'SB' },
    { name: 'Somalia', dial_code: '+252', code: 'SO' },
    { name: 'South Africa', dial_code: '+27', code: 'ZA' },
    { name: 'South Korea', dial_code: '+82', code: 'KR' },
    { name: 'South Sudan', dial_code: '+211', code: 'SS' },
    { name: 'Spain', dial_code: '+34', code: 'ES' },
    { name: 'Sri Lanka', dial_code: '+94', code: 'LK' },
    { name: 'Sudan', dial_code: '+249', code: 'SD' },
    { name: 'Suriname', dial_code: '+597', code: 'SR' },
    { name: 'Svalbard and Jan Mayen', dial_code: '+47', code: 'SJ' },
    { name: 'Sweden', dial_code: '+46', code: 'SE' },
    { name: 'Switzerland', dial_code: '+41', code: 'CH' },
    { name: 'Syria', dial_code: '+963', code: 'SY' },
    { name: 'Taiwan', dial_code: '+886', code: 'TW' },
    { name: 'Tajikistan', dial_code: '+992', code: 'TJ' },
    { name: 'Tanzania', dial_code: '+255', code: 'TZ' },
    { name: 'Thailand', dial_code: '+66', code: 'TH' },
    { name: 'Togo', dial_code: '+228', code: 'TG' },
    { name: 'Tokelau', dial_code: '+690', code: 'TK' },
    { name: 'Tonga', dial_code: '+676', code: 'TO' },
    { name: 'Trinidad and Tobago', dial_code: '+1 868', code: 'TT' },
    { name: 'Tunisia', dial_code: '+216', code: 'TN' },
    { name: 'Turkey', dial_code: '+90', code: 'TR' },
    { name: 'Turkmenistan', dial_code: '+993', code: 'TM' },
    { name: 'Turks and Caicos Islands', dial_code: '+1 649', code: 'TC' },
    { name: 'Tuvalu', dial_code: '+688', code: 'TV' },
    { name: 'U.S. Virgin Islands', dial_code: '+1 340', code: 'VI' },
    { name: 'Uganda', dial_code: '+256', code: 'UG' },
    { name: 'Ukraine', dial_code: '+380', code: 'UA' },
    { name: 'United Arab Emirates', dial_code: '+971', code: 'AE' },
    { name: 'United Kingdom', dial_code: '+44', code: 'GB' },
    { name: 'United States', dial_code: '+1', code: 'US' },
    { name: 'Uruguay', dial_code: '+598', code: 'UY' },
    { name: 'Uzbekistan', dial_code: '+998', code: 'UZ' },
    { name: 'Vanuatu', dial_code: '+678', code: 'VU' },
    { name: 'Vatican', dial_code: '+379', code: 'VA' },
    { name: 'Venezuela', dial_code: '+58', code: 'VE' },
    { name: 'Vietnam', dial_code: '+84', code: 'VN' },
    { name: 'Wallis and Futuna', dial_code: '+681', code: 'WF' },
    { name: 'Western Sahara', dial_code: '+212', code: 'EH' },
    { name: 'Yemen', dial_code: '+967', code: 'YE' },
    { name: 'Zambia', dial_code: '+260', code: 'ZM' },
    { name: 'Zimbabwe', dial_code: '+263', code: 'ZW' }
  ];
  http = inject(HttpClient);
  profileForm: FormGroup;
  profileImage: any; // Default image
  userId: any = "";
  changePasswordForm: FormGroup
  profileImageFile: any;
  saveButton=true





  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private ShareDataService: ShareDataService) {
    this.userId = localStorage.getItem("userId")?.replace(/"/g, '') || '';

    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    })

    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneCode: ['+91', [Validators.required]], // Default to India
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)], // 10-digit phone number
      ],

      businessType: ['', Validators.required],
      gstNo: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/)], // GST format
      ],
      companyName: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
  ngOnInit() {
    this.getUser()
  }
  profileSaveButton(){
   
    this.saveButton=false
  }
  profileSaveButtonDisable(){
    this.saveButton=true
  }

  getUser() {
    try {
      let params = new HttpParams().set('userId', this.userId);
      this.http.get('http://localhost:8000/auth/getUser', { params }).subscribe(
        (res: any) => {
          console.log('API Response:', res);

          if (res.message === 'getUser' && res.user) {
            this.profileForm.patchValue({
              fullName: res.user.fullName || '',
              email: res.user.email || '',
              phoneCode: res.user.phoneCode || '+91', // Default to India if not provided
              phoneNumber: res.user.phoneNumber || '',
              businessType: res.user.businessType || '',
              gstNo: res.user.gstNo || '',
              companyName: res.user.companyName || '',
              address: res.user.address || '',
            });
            // Set profile image if it exists in the response
            if (res.user.profileImage) {

              this.profileImage = `http://localhost:8000${res.user.profileImage}`;
              console.log("GET USER IMAGE >>>>>>>>", this.profileImage)
            } else {
              this.profileImage = 'userLogo.png'; // Default image
            }
            // Ensure form updates properly
            this.profileForm.markAsPristine();
            this.profileForm.markAsUntouched();
            this.profileForm.updateValueAndValidity();

          }
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );

    } catch (err) {
      console.log("CATCH>>>>>>>>")
    }

  }

 

  // Handle file selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profileImageFile = file; // Store the File object for upload

      this.profileImage = URL.createObjectURL(file); // Creates a blob URL
      this.profileSaveButton()
    }
    console.log('profileImage is still invalid', this.profileImage);
    console.log('profileImageFile is still invalid', this.profileImageFile);
  }

  ngOnDestroy() {
    if (this.profileImage) {
      URL.revokeObjectURL(this.profileImage); // Free memory
    }
  }
  // Trigger file input click when the edit button is clicked
  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      // console.log('Form is invalid before marking fields', this.profileForm.value);

      // Mark all fields as touched to trigger validation errors
      Object.keys(this.profileForm.controls).forEach(field => {
        const control = this.profileForm.get(field);
        control?.markAsTouched();
        control?.updateValueAndValidity();
      });

      console.log('Form is still invalid', this.profileForm);
      return;
    }


    // Create FormData object
    const formData = new FormData();

    // Append all form fields
    Object.keys(this.profileForm.value).forEach(key => {
      formData.append(key, this.profileForm.value[key]);
    });

    // Append the file if it exists
    if (this.profileImageFile) {
      formData.append('profileImage', this.profileImageFile);
    }
console.log("EDIT PROFILR DETAILS>>>>>>>>>",this.profileForm)

    this.http.patch(`http://localhost:8000/auth/updateUser/${this.userId}`, formData).subscribe(
      (res: any) => {
        console.log('User data updated successfully', res);
        localStorage.setItem("email", JSON.stringify(res.user?.email));
        localStorage.setItem("fullName", JSON.stringify(res.user?.fullName));
        localStorage.setItem("businessType", JSON.stringify(res.user?.businessType));
        localStorage.setItem("companyName", JSON.stringify(res.user?.companyName));
        localStorage.setItem("address", JSON.stringify(res.user?.address));
        localStorage.setItem("phoneNumber", JSON.stringify(res.user?.phoneNumber));
        localStorage.setItem("gstNo", JSON.stringify(res.user?.gstNo));
        localStorage.setItem("profileImage", res.user?.profileImage);
        console.log('Login Data:', res);
        this.ShareDataService.sendUserData(res);
        console.log('User data emitted:', res);
       this.profileSaveButtonDisable()
        this.openSnackBar('Profile updated successfully!', "OK");
      },
      (error) => {
        console.error('Error updating user:', error);
        alert('Failed to update profile.');
      }
    );
  }


  // Helper method to get form controls for easy access in the template
  get f() {
    return this.profileForm.controls;
  }
  // Helper method to get form controls for easy access in the template
  get ff() {
    return this.changePasswordForm.controls;
  }

  async changePassword() {
    if (this.changePasswordForm.valid) {


      if (this.changePasswordForm.value.newPassword === this.changePasswordForm.value.confirmPassword) {
        console.log(this.changePasswordForm.value.confirmPassword, "MATCH PASSWORD>>>>>>>>", this.changePasswordForm.value.newPassword)
        const obj = {
          oldPassword: this.changePasswordForm.value.oldPassword,
          newPassword: this.changePasswordForm.value.newPassword,
          userId: this.userId
        }

        await this.http.post("http://localhost:8000/auth/changeUserPassword", obj).subscribe(
          (res: any) => {
            console.log("PASSWORD is match >>>>>>>>", res)
            this.openSnackBar(`Error! ${res.message}`, 'Close');
            this.changePasswordForm.reset()
          })

      } else {
        // console.log("CHANGE PASSWORD>>>>>>>>", this.changePasswordForm.valid)
        this.openSnackBar('Error! New password and confirm password do not match.', 'Close');
      }
    }else{
      this.openSnackBar('Error! Passwords are required.', 'Close');
    }




  }
  // Method to show the snackbar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['custom-snackbar'] // Add custom class
    });
  }


}
