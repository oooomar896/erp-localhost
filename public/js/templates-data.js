/**
 * البيانات والنماذج الجاهزة المعتمدة:
 * - النماذج الظاهرة في التصميم المرجعي (ui ux.jpeg):
 *   1. شهادة تعريف بالراتب (نموذج 15)
 *   2. العرض الوظيفي (نموذج 1)
 *   3. خطاب إنذار إداري (نموذج 9)
 *   4. نموذج طلب إجازة (نموذج 13)
 *   5. إخلاء طرف (نموذج 21)
 * - بقية النماذج التفصيلية المرفقة في ملف (5-namathej.pdf):
 *   6. نموذج طلب توظيف (نموذج 2)
 *   7. نموذج إقرار مباشرة عمل (نموذج 3)
 *   8. نموذج تحديث بيانات الموظف (نموذج 4)
 *   9. نموذج تقييم فترة التجربة (نموذج 5)
 */

window.HR_CATEGORIES = [
  { id: 'all', nameAr: 'الكل', nameEn: 'All Forms', badgeCount: 72, icon: 'doc' },
  { id: 'recruitment', nameAr: 'الاستقطاب والتوظيف', nameEn: 'Recruitment & Hiring', badgeCount: 15, icon: 'users' },
  { id: 'payroll', nameAr: 'الرواتب والمكافآت', nameEn: 'Payroll & Benefits', badgeCount: 18, icon: 'wallet' },
  { id: 'policies', nameAr: 'اللوائح والأنظمة', nameEn: 'Policies & Regulations', badgeCount: 7, icon: 'shield' },
  { id: 'training', nameAr: 'التدريب والتطوير', nameEn: 'Training & Development', badgeCount: 10, icon: 'cap' },
  { id: 'reports', nameAr: 'التقارير والنماذج', nameEn: 'Reports & Evaluations', badgeCount: 72, icon: 'chart' },
  { id: 'health', nameAr: 'المهام الصحية', nameEn: 'Medical & Health', badgeCount: 6, icon: 'heart' },
  { id: 'admin', nameAr: 'العمليات الإدارية', nameEn: 'Admin Operations', badgeCount: 8, icon: 'gear' }
];

const JOB_TITLES_LIST = [
  'مستشار إداري',
  'مدير مشاريع',
  'أخصائي موارد بشرية',
  'محاسب مالي',
  'مهندس برمجيات',
  'مدير تنفيذي',
  'مشرف عمليات'
];

const DEPARTMENTS_LIST = [
  'الإدارة العامة',
  'الموارد البشرية',
  'الشؤون المالية',
  'تقنية المعلومات',
  'المبيعات والتسويق',
  'العمليات'
];

window.DEFAULT_HR_TEMPLATES = [
  // =========================================================================
  // 1. شهادة تعريف بالراتب (نموذج 15) - مطابق 100% للصورة المرجعية ui ux.jpeg
  // =========================================================================
  {
    id: 'form-15',
    number: 15,
    titleAr: 'شهادة تعريف بالراتب (نموذج 15)',
    titleEn: 'Salary Certificate (Form 15)',
    docHeadingAr: 'شهادة تعريف بالراتب',
    docHeadingEn: 'SALARY CERTIFICATE',
    category: 'payroll',
    langType: 'both',
    fields: [
      { key: 'employeeName', labelAr: 'اسم الموظف', labelEn: 'Employee Name', type: 'text', defaultValue: 'أسامة بكر' },
      { key: 'jobTitle', labelAr: 'المسمى الوظيفي', labelEn: 'Job Title', type: 'select', options: JOB_TITLES_LIST, defaultValue: 'مستشار إداري' },
      { key: 'department', labelAr: 'القسم الوظيفي', labelEn: 'Department', type: 'select', options: DEPARTMENTS_LIST, defaultValue: 'الإدارة العامة' },
      { key: 'totalSalary', labelAr: 'الراتب الإجمالي', labelEn: 'Total Salary', type: 'text', suffixAr: 'ريال', suffixEn: 'SAR', defaultValue: '15,000' }
    ],
    renderHtml: (vals, company, lang) => {
      const emp = vals.employeeName || 'أسامة بكر';
      const title = vals.jobTitle || 'مستشار إداري';
      const salary = vals.totalSalary || '15,000';

      if (lang === 'en') {
        return `
          <div class="doc-body-content" dir="ltr" style="text-align:left;">
            <p class="doc-salutation"><strong>To Whom It May Concern,</strong></p>
            <p class="doc-paragraph" style="text-align:left;">
              The Human Resources Department at <strong>${company.nameEn || company.nameAr || 'Advanced Technology Company'}</strong> hereby certifies that Mr./Ms.
              <span class="doc-highlight">${emp}</span> is currently employed with us in the capacity of
              (<strong>${title}</strong>), and receives a total monthly salary of (<strong>${salary} SAR</strong>).
            </p>
            <p class="doc-paragraph" style="text-align:left;">
              This certificate has been issued upon the employee's request without any financial or legal liability on the part of the company toward third parties.
            </p>
          </div>
        `;
      }

      return `
        <div class="doc-body-content">
          <p class="doc-salutation">إلى من يهمه الأمر،،</p>
          <p class="doc-paragraph">
            تشهد إدارة الموارد البشرية بأن السيد/ة: <span class="doc-highlight">${emp}</span>، يعمل لدينا بالمسمى (<strong>${title}</strong>)، ويتقاضى راتباً إجمالياً قدره (<strong>${salary} ريال</strong>).
          </p>
          <p class="doc-paragraph">
            وقد أعطيت له هذه الشهادة بناءً على طلبه دون أدنى مسؤولية على الشركة تجاه الغير.
          </p>
        </div>
      `;
    }
  },

  // =========================================================================
  // 2. العرض الوظيفي (نموذج 1 - من ui ux.jpeg و 5-namathej.pdf)
  // =========================================================================
  {
    id: 'form-1',
    number: 1,
    titleAr: 'العرض الوظيفي (نموذج 1)',
    titleEn: 'Job Offer Form (Form 1)',
    docHeadingAr: '1. نموذج العرض الوظيفي / Job Offer Form',
    docHeadingEn: '1. Job Offer Form / نموذج العرض الوظيفي',
    category: 'recruitment',
    langType: 'both',
    fields: [
      { key: 'employeeName', labelAr: 'اسم المرشح', labelEn: 'Candidate Name', type: 'text', defaultValue: 'أسامة بكر' },
      { key: 'jobTitle', labelAr: 'المسمى الوظيفي', labelEn: 'Job Title', type: 'select', options: JOB_TITLES_LIST, defaultValue: 'مستشار إداري' },
      { key: 'department', labelAr: 'الإدارة / القسم', labelEn: 'Department', type: 'select', options: DEPARTMENTS_LIST, defaultValue: 'الإدارة العامة' },
      { key: 'totalSalary', labelAr: 'إجمالي الراتب', labelEn: 'Total Salary', type: 'text', suffixAr: 'ريال', suffixEn: 'SAR', defaultValue: '15,000' },
      { key: 'basicSalary', labelAr: 'الراتب الأساسي', labelEn: 'Basic Salary', type: 'text', suffixAr: 'ريال', suffixEn: 'SAR', defaultValue: '11,000' },
      { key: 'housingAllowance', labelAr: 'بدل السكن', labelEn: 'Housing Allowance', type: 'text', suffixAr: 'ريال', suffixEn: 'SAR', defaultValue: '2,750' },
      { key: 'transportAllowance', labelAr: 'بدل النقل', labelEn: 'Transport Allowance', type: 'text', suffixAr: 'ريال', suffixEn: 'SAR', defaultValue: '1,250' },
      { key: 'expectedJoiningDate', labelAr: 'تاريخ المباشرة المتوقع', labelEn: 'Expected Joining Date', type: 'text', defaultValue: '2026/11/01' }
    ],
    renderHtml: (vals, company) => {
      const compName = company.nameAr || 'شركة التقنية المتقدمة';
      const compNameEn = company.nameEn || 'Advanced Technology Company';
      return `
        <div class="doc-body-content doc-compact">
          <div class="bilingual-grid">
            <div><strong>تاريخ العرض / Date:</strong> ${company.docDate || '2026/10/23'}</div>
            <div><strong>اسم المرشح / Candidate Name:</strong> ${vals.employeeName || 'أسامة بكر'}</div>
            <div><strong>المسمى الوظيفي / Job Title:</strong> ${vals.jobTitle || 'مستشار إداري'}</div>
            <div><strong>الإدارة / القسم / Department:</strong> ${vals.department || 'الإدارة العامة'}</div>
          </div>

          <div class="doc-box-section">
            <p style="margin-bottom:4px;">يسر شركة <strong>${compName}</strong> أن تقدم لكم عرضاً وظيفياً للانضمام إلى فريق عملنا وفقاً للشروط التالية:</p>
            <p dir="ltr" style="text-align:left; font-size:0.86em; color:#334155; margin-bottom:8px;">
              We are pleased to offer you the position at <strong>${compNameEn}</strong> under the following terms:
            </p>
            <table class="doc-form-table">
              <tbody>
                <tr>
                  <td><strong>الراتب الأساسي / Basic Salary:</strong></td>
                  <td>${vals.basicSalary || '11,000'} ريال</td>
                  <td><strong>بدل السكن / Housing Allowance:</strong></td>
                  <td>${vals.housingAllowance || '2,750'} ريال</td>
                </tr>
                <tr>
                  <td><strong>بدل النقل / Transport Allowance:</strong></td>
                  <td>${vals.transportAllowance || '1,250'} ريال</td>
                  <td><strong>إجمالي الراتب / Total Salary:</strong></td>
                  <td><strong>${vals.totalSalary || '15,000'} ريال</strong></td>
                </tr>
                <tr>
                  <td colspan="4">
                    <strong>فترة التجربة / Probation Period:</strong> (3) أشهر قابلة للتمديد وفق نظام العمل / (3) Months extensible as per Labor Law.
                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                    <strong>تاريخ المباشرة المتوقع / Expected Joining Date:</strong> ${vals.expectedJoiningDate || '2026/11/01'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="doc-box-section" style="margin-top:8px;">
            <p><strong>موافقة المرشح / Candidate Acceptance:</strong></p>
            <p>أقر أنا الموضح اسمي أعلاه بموافقتي على العرض الوظيفي الموضحة شروطه أعلاه.</p>
            <p dir="ltr" style="text-align:left; font-size:0.84em; color:#334155;">I hereby accept the job offer as detailed above.</p>
            <div style="display:flex; justify-content:space-between; margin-top:6px; padding-top:6px; border-top:1px dashed #cbd5e1;">
              <span><strong>توقيع المرشح / Signature:</strong> ____________________</span>
              <span><strong>التاريخ / Date:</strong> ____ / ____ / ________</span>
            </div>
          </div>
        </div>
      `;
    }
  },

  // =========================================================================
  // 3. خطاب إنذار إداري (نموذج 9 - من ui ux.jpeg)
  // =========================================================================
  {
    id: 'form-9',
    number: 9,
    titleAr: 'خطاب إنذار إداري (نموذج 9)',
    titleEn: 'Administrative Warning Letter (Form 9)',
    docHeadingAr: 'خطاب إنذار إداري',
    docHeadingEn: 'ADMINISTRATIVE WARNING LETTER',
    category: 'policies',
    langType: 'both',
    fields: [
      { key: 'employeeName', labelAr: 'اسم الموظف', labelEn: 'Employee Name', type: 'text', defaultValue: 'أسامة بكر' },
      { key: 'jobTitle', labelAr: 'المسمى الوظيفي', labelEn: 'Job Title', type: 'select', options: JOB_TITLES_LIST, defaultValue: 'مستشار إداري' },
      { key: 'department', labelAr: 'القسم الوظيفي', labelEn: 'Department', type: 'select', options: DEPARTMENTS_LIST, defaultValue: 'الإدارة العامة' },
      { key: 'warningReason', labelAr: 'موضوع المخالفة', labelEn: 'Violation Subject', type: 'text', defaultValue: 'التأخر عن مواعيد الدوام الرسمي دون عذر مسبق' }
    ],
    renderHtml: (vals, _company, lang) => {
      if (lang === 'en') {
        return `
          <div class="doc-body-content" dir="ltr" style="text-align:left;">
            <table class="doc-form-table" style="margin-bottom:14px;">
              <tbody>
                <tr>
                  <td style="text-align:left;"><strong>Employee Name:</strong> ${vals.employeeName || 'Osama Bakr'}</td>
                  <td style="text-align:left;"><strong>Job Title:</strong> ${vals.jobTitle || 'Management Consultant'}</td>
                  <td style="text-align:left;"><strong>Department:</strong> ${vals.department || 'General Management'}</td>
                </tr>
              </tbody>
            </table>
            <p class="doc-salutation"><strong>Subject: Official Administrative Warning</strong></p>
            <p class="doc-paragraph" style="text-align:left;">
              With reference to attendance and disciplinary monitoring, the Human Resources Department has recorded the following violation on your part:
              (<strong>${vals.warningReason || 'Repeated tardiness without prior excuse'}</strong>).
            </p>
            <p class="doc-paragraph" style="text-align:left;">
              You are hereby required to strictly adhere to company policies and work regulations. Any recurrence will result in disciplinary action in accordance with the Saudi Labor Law.
            </p>
          </div>
        `;
      }

      return `
        <div class="doc-body-content">
          <table class="doc-form-table" style="margin-bottom:14px;">
            <tbody>
              <tr>
                <td><strong>اسم الموظف:</strong> ${vals.employeeName || 'أسامة بكر'}</td>
                <td><strong>المسمى الوظيفي:</strong> ${vals.jobTitle || 'مستشار إداري'}</td>
                <td><strong>القسم:</strong> ${vals.department || 'الإدارة العامة'}</td>
              </tr>
            </tbody>
          </table>
          <p class="doc-salutation">الموضوع: <strong>إنذار إداري كتابي</strong></p>
          <p class="doc-paragraph">
            إشارة إلى متابعة الانضباط الوظيفي، فقد تبين لإدارة الموارد البشرية وقوع المخالفة التالية من قبلكم:
            (<span class="doc-highlight">${vals.warningReason || 'التأخر عن مواعيد الدوام الرسمي دون عذر مسبق'}</span>).
          </p>
          <p class="doc-paragraph">
            لذا نوجه لكم هذا الإنذار الرسمي بضرورة الالتزام التام بلوائح وأنظمة العمل المعتمدة في المنشأة، علماً بأنه في حال تكرار المخالفة سيتم تطبيق الجزاءات النظامية المنصوص عليها في لائحة تنظيم العمل ونظام العمل السعودي.
          </p>
          <div style="margin-top:12px; padding-top:8px; border-top:1px dashed #cbd5e1;">
            <strong>توقيع الموظف بالعلم والاستلام:</strong> ________________________ &nbsp;&nbsp;&nbsp; <strong>التاريخ:</strong> ____ / ____ / ________
          </div>
        </div>
      `;
    }
  },

  // =========================================================================
  // 4. نموذج طلب إجازة (نموذج 13 - من ui ux.jpeg)
  // =========================================================================
  {
    id: 'form-13',
    number: 13,
    titleAr: 'نموذج طلب إجازة (نموذج 13)',
    titleEn: 'Leave Request Form (Form 13)',
    docHeadingAr: 'نموذج طلب إجازة',
    docHeadingEn: 'LEAVE REQUEST FORM',
    category: 'admin',
    langType: 'both',
    fields: [
      { key: 'employeeName', labelAr: 'اسم الموظف', labelEn: 'Employee Name', type: 'text', defaultValue: 'أسامة بكر' },
      { key: 'jobTitle', labelAr: 'المسمى الوظيفي', labelEn: 'Job Title', type: 'select', options: JOB_TITLES_LIST, defaultValue: 'مستشار إداري' },
      { key: 'department', labelAr: 'القسم الوظيفي', labelEn: 'Department', type: 'select', options: DEPARTMENTS_LIST, defaultValue: 'الإدارة العامة' },
      { key: 'leaveDuration', labelAr: 'مدة الإجازة', labelEn: 'Leave Duration', type: 'text', suffixAr: 'يوم', suffixEn: 'Days', defaultValue: '15' },
      { key: 'leaveType', labelAr: 'نوع الإجازة', labelEn: 'Leave Type', type: 'select', options: ['إجازة سنوية اعتيادية', 'إجازة مرضية', 'إجازة اضطرارية', 'إجازة بدون راتب', 'إجازة زواج / مولود'], defaultValue: 'إجازة سنوية اعتيادية' },
      { key: 'startDate', labelAr: 'تاريخ بداية الإجازة', labelEn: 'Start Date', type: 'text', defaultValue: '2026/11/01' }
    ],
    renderHtml: (vals) => {
      return `
        <div class="doc-body-content doc-compact">
          <table class="doc-form-table">
            <tbody>
              <tr>
                <td><strong>اسم الموظف:</strong> ${vals.employeeName || 'أسامة بكر'}</td>
                <td><strong>المسمى الوظيفي:</strong> ${vals.jobTitle || 'مستشار إداري'}</td>
              </tr>
              <tr>
                <td><strong>القسم الوظيفي:</strong> ${vals.department || 'الإدارة العامة'}</td>
                <td><strong>نوع الإجازة:</strong> <strong>${vals.leaveType || 'إجازة سنوية اعتيادية'}</strong></td>
              </tr>
              <tr>
                <td><strong>تاريخ بداية الإجازة:</strong> ${vals.startDate || '2026/11/01'}</td>
                <td><strong>مدة الإجازة المطلوبة:</strong> <strong>${vals.leaveDuration || '15'} يوم</strong></td>
              </tr>
            </tbody>
          </table>
          <div class="doc-box-section" style="margin-top:12px;">
            <p>أرجو التكرم بالموافقة على منحي الإجازة الموضحة بياناتها أعلاه، وأقر بتسليم كافة مهامي العاجلة للموظف البديل قبل بدء الإجازة.</p>
            <div style="display:flex; justify-content:space-between; margin-top:10px; padding-top:8px; border-top:1px dashed #cbd5e1;">
              <span><strong>توقيع الموظف:</strong> ________________</span>
              <span><strong>اعتماد المدير المباشر:</strong> ________________</span>
            </div>
          </div>
        </div>
      `;
    }
  },

  // =========================================================================
  // 5. إخلاء طرف (نموذج 21 - من ui ux.jpeg)
  // =========================================================================
  {
    id: 'form-21',
    number: 21,
    titleAr: 'إخلاء طرف (نموذج 21)',
    titleEn: 'Employee Clearance Form (Form 21)',
    docHeadingAr: 'نموذج إخلاء طرف موظف',
    docHeadingEn: 'EMPLOYEE CLEARANCE FORM',
    category: 'health',
    secondaryCategory: 'admin',
    langType: 'both',
    fields: [
      { key: 'employeeName', labelAr: 'اسم الموظف', labelEn: 'Employee Name', type: 'text', defaultValue: 'أسامة بكر' },
      { key: 'jobTitle', labelAr: 'المسمى الوظيفي', labelEn: 'Job Title', type: 'select', options: JOB_TITLES_LIST, defaultValue: 'مستشار إداري' },
      { key: 'department', labelAr: 'القسم الوظيفي', labelEn: 'Department', type: 'select', options: DEPARTMENTS_LIST, defaultValue: 'الإدارة العامة' },
      { key: 'lastWorkDay', labelAr: 'تاريخ إخلاء الطرف', labelEn: 'Clearance Date', type: 'text', defaultValue: '2026/10/30' }
    ],
    renderHtml: (vals) => {
      return `
        <div class="doc-body-content doc-compact">
          <table class="doc-form-table">
            <tbody>
              <tr>
                <td><strong>اسم الموظف:</strong> ${vals.employeeName || 'أسامة بكر'}</td>
                <td><strong>المسمى الوظيفي:</strong> ${vals.jobTitle || 'مستشار إداري'}</td>
              </tr>
              <tr>
                <td><strong>القسم الوظيفي:</strong> ${vals.department || 'الإدارة العامة'}</td>
                <td><strong>تاريخ إخلاء الطرف:</strong> ${vals.lastWorkDay || '2026/10/30'}</td>
              </tr>
            </tbody>
          </table>

          <p style="margin:10px 0 6px; font-weight:700; color:#162538;">اعتماد الإدارات المعنية بتسليم العهد والالتزامات:</p>
          <table class="doc-form-table">
            <thead>
              <tr style="background:#f1f5f9;">
                <th>الإدارة المعنية</th>
                <th>حالة العهدة والالتزامات</th>
                <th>التوقيع</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>الإدارة المباشرة (ملفات العمل)</td><td>تم الاستلام ولا توجد ملاحظات</td><td>__________</td></tr>
              <tr><td>تقنية المعلومات (الأجهزة والحسابات)</td><td>تم الاستلام ولا توجد ملاحظات</td><td>__________</td></tr>
              <tr><td>الشؤون المالية (العهد والسلف)</td><td>بريء الذمة مالياً</td><td>__________</td></tr>
              <tr><td>الموارد البشرية (البطاقة والتأمين الطبي)</td><td>تم استكمال الإجراءات</td><td>__________</td></tr>
            </tbody>
          </table>
        </div>
      `;
    }
  },

  // =========================================================================
  // 6. نموذج طلب توظيف (نموذج 2 من ملف 5-namathej.pdf)
  // =========================================================================
  {
    id: 'form-2',
    number: 2,
    titleAr: 'نموذج طلب توظيف (نموذج 2)',
    titleEn: 'Job Application Form (Form 2)',
    docHeadingAr: '2. نموذج طلب توظيف / Job Application Form',
    docHeadingEn: '2. Job Application Form / نموذج طلب توظيف',
    category: 'recruitment',
    langType: 'both',
    fields: [
      { key: 'employeeName', labelAr: 'الاسم الكامل / Full Name', labelEn: 'Full Name', type: 'text', defaultValue: 'أسامة بكر' },
      { key: 'jobTitle', labelAr: 'الوظيفة المتقدم لها / Position', labelEn: 'Position Applied For', type: 'select', options: JOB_TITLES_LIST, defaultValue: 'مستشار إداري' },
      { key: 'nationality', labelAr: 'الجنسية / Nationality', labelEn: 'Nationality', type: 'text', defaultValue: 'سعودي' },
      { key: 'idNumber', labelAr: 'رقم الهوية/الإقامة / ID No', labelEn: 'ID/Iqama No', type: 'text', defaultValue: '1088776655' },
      { key: 'mobile', labelAr: 'رقم الجوال / Mobile', labelEn: 'Mobile', type: 'text', defaultValue: '0550001122' },
      { key: 'email', labelAr: 'البريد الإلكتروني / Email', labelEn: 'Email', type: 'text', defaultValue: 'osama@company.sa' },
      { key: 'degree', labelAr: 'المؤهل والتخصص / Degree', labelEn: 'Degree & Major', type: 'text', defaultValue: 'بكالوريوس - إدارة أعمال (2020)' },
      { key: 'exp1Company', labelAr: 'الخبرة السابقة / Experience', labelEn: 'Previous Experience', type: 'text', defaultValue: 'شركة الأفق للاستشارات - أخصائي إداري (2021-2025)' }
    ],
    renderHtml: (vals, company) => {
      return `
        <div class="doc-body-content doc-compact">
          <table class="doc-form-table">
            <tbody>
              <tr>
                <td><strong>التاريخ / Date:</strong> ${company.docDate || '2026/10/23'}</td>
                <td colspan="3"><strong>الاسم الكامل / Full Name:</strong> ${vals.employeeName || 'أسامة بكر'}</td>
              </tr>
              <tr>
                <td colspan="2"><strong>الجنسية / Nationality:</strong> ${vals.nationality || 'سعودي'}</td>
                <td colspan="2"><strong>رقم الهوية/الإقامة / ID/Iqama No:</strong> ${vals.idNumber || '1088776655'}</td>
              </tr>
              <tr>
                <td colspan="2"><strong>رقم الجوال / Mobile:</strong> ${vals.mobile || '0550001122'}</td>
                <td colspan="2"><strong>البريد الإلكتروني / Email:</strong> ${vals.email || 'osama@company.sa'}</td>
              </tr>
              <tr>
                <td colspan="4"><strong>الوظيفة المتقدم لها / Position Applied For:</strong> ${vals.jobTitle || 'مستشار إداري'}</td>
              </tr>
            </tbody>
          </table>

          <div class="doc-box-section" style="margin-top:8px;">
            <p><strong>المؤهلات العلمية / Educational Qualifications:</strong></p>
            <p style="margin-top:4px;">- المؤهل والتخصص والسنة / Degree, Major & Year: <strong>${vals.degree || 'بكالوريوس - إدارة أعمال (2020)'}</strong></p>
          </div>

          <div class="doc-box-section" style="margin-top:8px;">
            <p><strong>الخبرات العملية / Work Experience:</strong></p>
            <p style="margin-top:4px;">1. ${vals.exp1Company || 'شركة الأفق للاستشارات - أخصائي إداري (2021-2025)'}</p>
            <p style="margin-top:4px;">2. الشركة / Company: _______________ &nbsp;|&nbsp; المسمى / Title: _______________ &nbsp;|&nbsp; الفترة / Period: ________</p>
            <div style="margin-top:8px; padding-top:6px; border-top:1px dashed #cbd5e1;">
              <strong>توقيع المتقدم / Applicant Signature:</strong> ________________________
            </div>
          </div>
        </div>
      `;
    }
  },

  // =========================================================================
  // 7. نموذج إقرار مباشرة عمل (نموذج 3 من ملف 5-namathej.pdf)
  // =========================================================================
  {
    id: 'form-3',
    number: 3,
    titleAr: 'إقرار مباشرة عمل (نموذج 3)',
    titleEn: 'Commencement of Work Form (Form 3)',
    docHeadingAr: '3. نموذج إقرار مباشرة عمل / Commencement of Work Form',
    docHeadingEn: '3. Commencement of Work Form / نموذج إقرار مباشرة عمل',
    category: 'recruitment',
    langType: 'both',
    fields: [
      { key: 'employeeName', labelAr: 'اسم الموظف', labelEn: 'Employee Name', type: 'text', defaultValue: 'أسامة بكر' },
      { key: 'jobTitle', labelAr: 'المسمى الوظيفي', labelEn: 'Job Title', type: 'select', options: JOB_TITLES_LIST, defaultValue: 'مستشار إداري' },
      { key: 'department', labelAr: 'القسم الوظيفي', labelEn: 'Department', type: 'select', options: DEPARTMENTS_LIST, defaultValue: 'الإدارة العامة' },
      { key: 'employeeId', labelAr: 'الرقم الوظيفي', labelEn: 'Employee ID', type: 'text', defaultValue: 'EMP-1042' },
      { key: 'joiningDate', labelAr: 'تاريخ المباشرة', labelEn: 'Joining Date', type: 'text', defaultValue: '2026/10/23' }
    ],
    renderHtml: (vals, company) => {
      return `
        <div class="doc-body-content doc-compact">
          <table class="doc-form-table">
            <tbody>
              <tr>
                <td><strong>التاريخ / Date:</strong> ${company.docDate || '2026/10/23'}</td>
                <td><strong>الرقم الوظيفي / Employee ID:</strong> ${vals.employeeId || 'EMP-1042'}</td>
              </tr>
              <tr>
                <td><strong>اسم الموظف / Employee Name:</strong> ${vals.employeeName || 'أسامة بكر'}</td>
                <td><strong>الوظيفة / Position:</strong> ${vals.jobTitle || 'مستشار إداري'}</td>
              </tr>
              <tr>
                <td><strong>القسم / Department:</strong> ${vals.department || 'الإدارة العامة'}</td>
                <td><strong>تاريخ المباشرة / Joining Date:</strong> ${vals.joiningDate || '2026/10/23'}</td>
              </tr>
            </tbody>
          </table>

          <div class="doc-box-section" style="margin-top:10px;">
            <p style="font-weight:600; margin-bottom:4px;">أقر أنا الموظف المذكور أعلاه بأنني قد باشرت عملي فعلياً لدى الشركة بتاريخ اليوم الموضح أعلاه.</p>
            <p dir="ltr" style="text-align:left; font-size:0.86em; color:#334155;">I hereby confirm that I have officially commenced my duties on the date mentioned above.</p>
          </div>

          <div class="doc-box-section" style="margin-top:10px;">
            <p style="margin-bottom:6px;"><strong>- توقيع الموظف / Employee Signature:</strong> ________________________</p>
            <p style="margin-bottom:6px;"><strong>- اعتماد المدير المباشر / Line Manager Approval:</strong> ________________________</p>
            <p><strong>- اعتماد الموارد البشرية / HR Approval:</strong> ________________________</p>
          </div>
        </div>
      `;
    }
  },

  // =========================================================================
  // 8. نموذج تحديث بيانات الموظف (نموذج 4 من ملف 5-namathej.pdf)
  // =========================================================================
  {
    id: 'form-4',
    number: 4,
    titleAr: 'تحديث بيانات الموظف (نموذج 4)',
    titleEn: 'Employee Information Update Form (Form 4)',
    docHeadingAr: '4. نموذج تحديث بيانات الموظف / Employee Information Update Form',
    docHeadingEn: '4. Employee Information Update Form / تحديث بيانات الموظف',
    category: 'admin',
    langType: 'both',
    fields: [
      { key: 'employeeName', labelAr: 'اسم الموظف', labelEn: 'Employee Name', type: 'text', defaultValue: 'أسامة بكر' },
      { key: 'employeeId', labelAr: 'الرقم الوظيفي', labelEn: 'Employee ID', type: 'text', defaultValue: 'EMP-1042' },
      { key: 'mobileNo', labelAr: 'رقم الجوال الجديد', labelEn: 'Mobile No', type: 'text', defaultValue: '0501234567' },
      { key: 'nationalAddress', labelAr: 'العنوان الوطني', labelEn: 'National Address', type: 'text', defaultValue: 'الرياض - حي العليا - 12211' },
      { key: 'emergencyName', labelAr: 'اسم شخص عند الطوارئ', labelEn: 'Emergency Contact', type: 'text', defaultValue: 'أحمد بكر (أخ)' },
      { key: 'emergencyPhone', labelAr: 'جوال الطوارئ', labelEn: 'Emergency Phone', type: 'text', defaultValue: '0507654321' },
      { key: 'iban', labelAr: 'الحساب البنكي (IBAN)', labelEn: 'Bank IBAN', type: 'text', defaultValue: 'SA0000000000000000000000' }
    ],
    renderHtml: (vals, company) => {
      return `
        <div class="doc-body-content doc-compact">
          <table class="doc-form-table">
            <tbody>
              <tr>
                <td><strong>التاريخ / Date:</strong> ${company.docDate || '2026/10/23'}</td>
                <td><strong>الرقم الوظيفي / Employee ID:</strong> ${vals.employeeId || 'EMP-1042'}</td>
              </tr>
              <tr>
                <td colspan="2"><strong>اسم الموظف / Employee Name:</strong> ${vals.employeeName || 'أسامة بكر'}</td>
              </tr>
            </tbody>
          </table>

          <div class="doc-box-section" style="margin-top:10px;">
            <p style="font-weight:700; color:#162538; margin-bottom:6px;">البيانات الشخصية الجديدة / Updated Personal Details:</p>
            <table class="doc-form-table">
              <tbody>
                <tr>
                  <td><strong>رقم الجوال / Mobile No:</strong> ${vals.mobileNo || '0501234567'}</td>
                  <td><strong>العنوان الوطني / National Address:</strong> ${vals.nationalAddress || 'الرياض - حي العليا - 12211'}</td>
                </tr>
                <tr>
                  <td><strong>شخص للطوارئ / Emergency Contact:</strong> ${vals.emergencyName || 'أحمد بكر (أخ)'}</td>
                  <td><strong>جوال الطوارئ / Emergency Phone:</strong> ${vals.emergencyPhone || '0507654321'}</td>
                </tr>
                <tr>
                  <td colspan="2"><strong>الحساب البنكي (IBAN):</strong> <span dir="ltr">${vals.iban || 'SA0000000000000000000000'}</span></td>
                </tr>
              </tbody>
            </table>
            <div style="margin-top:8px; padding-top:6px; border-top:1px dashed #cbd5e1;">
              <strong>توقيع الموظف / Employee Signature:</strong> ________________________
            </div>
          </div>
        </div>
      `;
    }
  },

  // =========================================================================
  // 9. نموذج تقييم فترة التجربة (نموذج 5 من ملف 5-namathej.pdf)
  // =========================================================================
  {
    id: 'form-5',
    number: 5,
    titleAr: 'تقييم فترة التجربة (نموذج 5)',
    titleEn: 'Probation Period Evaluation Form (Form 5)',
    docHeadingAr: '5. نموذج تقييم فترة التجربة / Probation Period Evaluation Form',
    docHeadingEn: '5. Probation Period Evaluation Form / تقييم فترة التجربة',
    category: 'reports',
    langType: 'both',
    fields: [
      { key: 'employeeName', labelAr: 'اسم الموظف', labelEn: 'Employee Name', type: 'text', defaultValue: 'أسامة بكر' },
      { key: 'jobTitle', labelAr: 'المسمى الوظيفي', labelEn: 'Job Title', type: 'select', options: JOB_TITLES_LIST, defaultValue: 'مستشار إداري' },
      { key: 'department', labelAr: 'القسم الوظيفي', labelEn: 'Department', type: 'select', options: DEPARTMENTS_LIST, defaultValue: 'الإدارة العامة' },
      { key: 'employeeId', labelAr: 'الرقم الوظيفي', labelEn: 'Employee ID', type: 'text', defaultValue: 'EMP-1042' },
      { key: 'startDate', labelAr: 'تاريخ بداية العمل', labelEn: 'Start Date', type: 'text', defaultValue: '2026/07/23' },
      { key: 'endDate', labelAr: 'تاريخ نهاية التجربة', labelEn: 'End Date', type: 'text', defaultValue: '2026/10/23' },
      { key: 'probationResult', labelAr: 'التقييم والتوصية', labelEn: 'Evaluation & Decision', type: 'select', options: ['ممتاز - تثبيت الموظف في الوظيفة', 'جيد جداً - تثبيت الموظف', 'تمديد فترة التجربة 3 أشهر', 'إنهاء العقد خلال فترة التجربة'], defaultValue: 'ممتاز - تثبيت الموظف في الوظيفة' }
    ],
    renderHtml: (vals, company) => {
      return `
        <div class="doc-body-content doc-compact">
          <table class="doc-form-table">
            <tbody>
              <tr>
                <td><strong>التاريخ / Date:</strong> ${company.docDate || '2026/10/23'}</td>
                <td><strong>اسم الموظف / Employee Name:</strong> ${vals.employeeName || 'أسامة بكر'}</td>
              </tr>
              <tr>
                <td><strong>المسمى الوظيفي / Position:</strong> ${vals.jobTitle || 'مستشار إداري'}</td>
                <td><strong>الرقم الوظيفي / Employee ID:</strong> ${vals.employeeId || 'EMP-1042'}</td>
              </tr>
              <tr>
                <td><strong>القسم / Department:</strong> ${vals.department || 'الإدارة العامة'}</td>
                <td><strong>مدة فترة التجربة / Probation Duration:</strong> 3 Months / أشهر</td>
              </tr>
              <tr>
                <td><strong>تاريخ بداية العمل / Start Date:</strong> ${vals.startDate || '2026/07/23'}</td>
                <td><strong>تاريخ نهاية التجربة / End Date:</strong> ${vals.endDate || '2026/10/23'}</td>
              </tr>
              <tr>
                <td colspan="2"><strong>نتيجة التقييم والتوصية / Recommendation:</strong> <strong>${vals.probationResult || 'ممتاز - تثبيت الموظف في الوظيفة'}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    }
  }
];
