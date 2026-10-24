/**
 * النماذج الجاهزة المعتمدة حالياً:
 * - النماذج الـ 5 من ملف (5-namathej.pdf) بالتنسيق المزدوج (عربي / إنجليزي)
 * - النماذج الظاهرة في واجهة التصميم المرجعي (ui ux.jpeg):
 *   (شهادة تعريف بالراتب نموذج 15، العرض الوظيفي نموذج 1، خطاب إنذار إداري نموذج 9، طلب إجازة نموذج 13، إخلاء طرف نموذج 21)
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

window.DEFAULT_HR_TEMPLATES = [
  // 1. شهادة تعريف بالراتب (نموذج 15) - مطابق لمعاينة ui ux.jpeg
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
      { key: 'jobTitle', labelAr: 'المسمى الوظيفي', labelEn: 'Job Title', type: 'select', options: ['مستشار إداري', 'مدير مشاريع', 'أخصائي موارد بشرية', 'محاسب مالي', 'مهندس برمجيات', 'مدير تنفيذي'], defaultValue: 'مستشار إداري' },
      { key: 'department', labelAr: 'القسم الوظيفي', labelEn: 'Department', type: 'select', options: ['الإدارة العامة', 'الموارد البشرية', 'الشؤون المالية', 'تقنية المعلومات', 'المبيعات والتسويق', 'العمليات'], defaultValue: 'الإدارة العامة' },
      { key: 'totalSalary', labelAr: 'الراتب الإجمالي', labelEn: 'Total Salary', type: 'text', suffixAr: 'ريال', suffixEn: 'SAR', defaultValue: '15,000' },
      { key: 'idNumber', labelAr: 'رقم الهوية / الإقامة (اختياري)', labelEn: 'ID / Iqama No (Optional)', type: 'text', defaultValue: '' },
      { key: 'recipient', labelAr: 'الجهة الموجه لها', labelEn: 'Addressed To', type: 'text', defaultValue: 'إلى من يهمه الأمر،،' }
    ],
    renderHtml: (vals, company, lang) => {
      const emp = vals.employeeName || '____________________';
      const title = vals.jobTitle || '____________________';
      const salary = vals.totalSalary || '________';
      const idStr = vals.idNumber ? ` (هوية/إقامة رقم: <strong>${vals.idNumber}</strong>)` : '';
      const recipient = vals.recipient || 'إلى من يهمه الأمر،،';

      if (lang === 'en') {
        return `
          <div class="doc-body-content" dir="ltr" style="text-align:left;">
            <p class="doc-salutation"><strong>To Whom It May Concern,</strong></p>
            <p class="doc-paragraph" style="text-align:left;">
              The Human Resources Department at <strong>${company.nameEn || company.nameAr || 'the Company'}</strong> hereby certifies that Mr./Ms.
              <span class="doc-highlight">${emp}</span>${vals.idNumber ? ` (ID/Iqama No: <strong>${vals.idNumber}</strong>)` : ''} is currently employed with us in the capacity of
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
          <p class="doc-salutation">${recipient}</p>
          <p class="doc-paragraph">
            تشهد إدارة الموارد البشرية بأن السيد/ة: <span class="doc-highlight">${emp}</span>${idStr}، يعمل لدينا بالمسمى (<strong>${title}</strong>)، ويتقاضى راتباً إجمالياً قدره (<strong>${salary} ريال</strong>).
          </p>
          <p class="doc-paragraph">
            وقد أعطيت له هذه الشهادة بناءً على طلبه دون أدنى مسؤولية على الشركة تجاه الغير.
          </p>
        </div>
      `;
    }
  },

  // 2. العرض الوظيفي (نموذج 1 - مطابق لملف 5-namathej.pdf)
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
      { key: 'offerDate', labelAr: 'تاريخ العرض / Date', labelEn: 'Offer Date', type: 'text', defaultValue: '2026/10/23' },
      { key: 'candidateName', labelAr: 'اسم المرشح / Candidate Name', labelEn: 'Candidate Name', type: 'text', defaultValue: 'أسامة بكر' },
      { key: 'jobTitle', labelAr: 'المسمى الوظيفي / Job Title', labelEn: 'Job Title', type: 'text', defaultValue: 'مستشار إداري' },
      { key: 'department', labelAr: 'الإدارة / القسم / Department', labelEn: 'Department', type: 'text', defaultValue: 'الإدارة العامة' },
      { key: 'basicSalary', labelAr: 'الراتب الأساسي / Basic Salary', labelEn: 'Basic Salary', type: 'text', suffixAr: 'ريال', defaultValue: '11,000' },
      { key: 'housingAllowance', labelAr: 'بدل السكن / Housing Allowance', labelEn: 'Housing Allowance', type: 'text', suffixAr: 'ريال', defaultValue: '2,750' },
      { key: 'transportAllowance', labelAr: 'بدل النقل / Transport Allowance', labelEn: 'Transport Allowance', type: 'text', suffixAr: 'ريال', defaultValue: '1,250' },
      { key: 'totalSalary', labelAr: 'إجمالي الراتب / Total Salary', labelEn: 'Total Salary', type: 'text', suffixAr: 'ريال', defaultValue: '15,000' },
      { key: 'probationMonths', labelAr: 'فترة التجربة (أشهر)', labelEn: 'Probation (Months)', type: 'text', defaultValue: '3' },
      { key: 'expectedJoiningDate', labelAr: 'تاريخ المباشرة المتوقع', labelEn: 'Expected Joining Date', type: 'text', defaultValue: '2026/11/01' }
    ],
    renderHtml: (vals, company) => {
      const compName = company.nameAr || '_______________';
      const compNameEn = company.nameEn || compName;
      return `
        <div class="doc-body-content doc-compact">
          <div class="bilingual-grid">
            <div><strong>تاريخ العرض / Date:</strong> ${vals.offerDate || '____ / ____ / ________'}</div>
            <div><strong>اسم المرشح / Candidate Name:</strong> ${vals.candidateName || '___________________________'}</div>
            <div><strong>المسمى الوظيفي / Job Title:</strong> ${vals.jobTitle || '___________________________'}</div>
            <div><strong>الإدارة / القسم / Department:</strong> ${vals.department || '___________________________'}</div>
          </div>

          <div class="doc-box-section">
            <p style="margin-bottom:4px;">يسر شركة <strong>${compName}</strong> أن تقدم لكم عرضاً وظيفياً للانضمام إلى فريق عملنا وفقاً للشروط التالية:</p>
            <p dir="ltr" style="text-align:left; font-size:0.88em; color:#334155; margin-bottom:8px;">
              We are pleased to offer you the position at <strong>${compNameEn}</strong> under the following terms:
            </p>
            <table class="doc-form-table">
              <tbody>
                <tr>
                  <td><strong>الراتب الأساسي / Basic Salary:</strong></td>
                  <td>${vals.basicSalary ? vals.basicSalary + ' ريال' : '_______________'}</td>
                  <td><strong>بدل السكن / Housing Allowance:</strong></td>
                  <td>${vals.housingAllowance ? vals.housingAllowance + ' ريال' : '_______________'}</td>
                </tr>
                <tr>
                  <td><strong>بدل النقل / Transport Allowance:</strong></td>
                  <td>${vals.transportAllowance ? vals.transportAllowance + ' ريال' : '_______________'}</td>
                  <td><strong>إجمالي الراتب / Total Salary:</strong></td>
                  <td><strong>${vals.totalSalary ? vals.totalSalary + ' ريال' : '_______________'}</strong></td>
                </tr>
                <tr>
                  <td colspan="4">
                    <strong>فترة التجربة / Probation Period:</strong> (${vals.probationMonths || '3'}) أشهر قابلة للتمديد وفق نظام العمل / (${vals.probationMonths || '3'}) Months extensible as per Labor Law.
                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                    <strong>تاريخ المباشرة المتوقع / Expected Joining Date:</strong> ${vals.expectedJoiningDate || '____ / ____ / ________'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="doc-box-section" style="margin-top:10px;">
            <p><strong>موافقة المرشح / Candidate Acceptance:</strong></p>
            <p>أقر أنا الموضح اسمي أعلاه بموافقتي على العرض الوظيفي الموضحة شروطه أعلاه.</p>
            <p dir="ltr" style="text-align:left; font-size:0.86em; color:#334155;">I hereby accept the job offer as detailed above.</p>
            <div style="display:flex; justify-content:space-between; margin-top:8px; padding-top:6px; border-top:1px dashed #cbd5e1;">
              <span><strong>توقيع المرشح / Signature:</strong> ____________________</span>
              <span><strong>التاريخ / Date:</strong> ____ / ____ / ________</span>
            </div>
          </div>
        </div>
      `;
    }
  },

  // 3. خطاب إنذار إداري (نموذج 9 - ظاهر في قائمة ui ux.jpeg)
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
      { key: 'employeeId', labelAr: 'الرقم الوظيفي', labelEn: 'Employee ID', type: 'text', defaultValue: 'EMP-1042' },
      { key: 'jobTitle', labelAr: 'المسمى الوظيفي', labelEn: 'Job Title', type: 'text', defaultValue: 'مستشار إداري' },
      { key: 'department', labelAr: 'القسم الوظيفي', labelEn: 'Department', type: 'text', defaultValue: 'الإدارة العامة' },
      { key: 'warningLevel', labelAr: 'درجة الإنذار', labelEn: 'Warning Level', type: 'select', options: ['إنذار كتابي أول', 'إنذار كتابي ثانٍ', 'إنذار كتابي نهائي'], defaultValue: 'إنذار كتابي أول' },
      { key: 'violationDate', labelAr: 'تاريخ المخالفة', labelEn: 'Violation Date', type: 'text', defaultValue: '2026/10/20' },
      { key: 'violationDetails', labelAr: 'موضوع المخالفة', labelEn: 'Violation Description', type: 'text', defaultValue: 'التأخر عن مواعيد الدوام الرسمي دون عذر مسبق' }
    ],
    renderHtml: (vals) => {
      return `
        <div class="doc-body-content doc-compact">
          <table class="doc-form-table" style="margin-bottom:12px;">
            <tbody>
              <tr>
                <td><strong>اسم الموظف:</strong> ${vals.employeeName || '________________'}</td>
                <td><strong>الرقم الوظيفي:</strong> ${vals.employeeId || '________'}</td>
              </tr>
              <tr>
                <td><strong>المسمى الوظيفي:</strong> ${vals.jobTitle || '________________'}</td>
                <td><strong>القسم:</strong> ${vals.department || '________________'}</td>
              </tr>
            </tbody>
          </table>
          <p class="doc-salutation">الموضوع: <strong>${vals.warningLevel || 'إنذار كتابي'}</strong></p>
          <p class="doc-paragraph">
            إشارة إلى متابعة الانضباط الوظيفي، فقد تبين لإدارة الموارد البشرية بتاريخ (<strong>${vals.violationDate || '____/____/____'}</strong>) وقوع المخالفة التالية من قبلكم:
            <span class="doc-highlight">${vals.violationDetails || '____________________________________________________'}</span>.
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

  // 4. نموذج طلب إجازة (نموذج 13 - ظاهر في قائمة ui ux.jpeg)
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
      { key: 'employeeId', labelAr: 'الرقم الوظيفي', labelEn: 'Employee ID', type: 'text', defaultValue: 'EMP-1042' },
      { key: 'jobTitle', labelAr: 'المسمى الوظيفي', labelEn: 'Job Title', type: 'text', defaultValue: 'مستشار إداري' },
      { key: 'department', labelAr: 'القسم الوظيفي', labelEn: 'Department', type: 'text', defaultValue: 'الإدارة العامة' },
      { key: 'leaveType', labelAr: 'نوع الإجازة', labelEn: 'Leave Type', type: 'select', options: ['إجازة سنوية اعتيادية', 'إجازة مرضية', 'إجازة اضطرارية', 'إجازة بدون راتب', 'إجازة زواج / مولود'], defaultValue: 'إجازة سنوية اعتيادية' },
      { key: 'startDate', labelAr: 'تاريخ بداية الإجازة', labelEn: 'Start Date', type: 'text', defaultValue: '2026/11/01' },
      { key: 'endDate', labelAr: 'تاريخ نهاية الإجازة', labelEn: 'End Date', type: 'text', defaultValue: '2026/11/15' },
      { key: 'daysCount', labelAr: 'المدة (بالأيام)', labelEn: 'Duration (Days)', type: 'text', defaultValue: '15 يوماً' },
      { key: 'substituteEmployee', labelAr: 'الموظف البديل أثناء الإجازة', labelEn: 'Substitute Employee', type: 'text', defaultValue: 'سلمان العلي' }
    ],
    renderHtml: (vals) => {
      return `
        <div class="doc-body-content doc-compact">
          <table class="doc-form-table">
            <tbody>
              <tr>
                <td><strong>اسم الموظف:</strong> ${vals.employeeName || '________________'}</td>
                <td><strong>الرقم الوظيفي:</strong> ${vals.employeeId || '________'}</td>
              </tr>
              <tr>
                <td><strong>المسمى الوظيفي:</strong> ${vals.jobTitle || '________________'}</td>
                <td><strong>القسم:</strong> ${vals.department || '________________'}</td>
              </tr>
              <tr>
                <td><strong>نوع الإجازة المطلوبة:</strong> <strong>${vals.leaveType || 'إجازة سنوية'}</strong></td>
                <td><strong>عدد أيام الإجازة:</strong> ${vals.daysCount || '________'}</td>
              </tr>
              <tr>
                <td><strong>تاريخ بداية الإجازة:</strong> ${vals.startDate || '____/____/____'}</td>
                <td><strong>تاريخ نهاية الإجازة:</strong> ${vals.endDate || '____/____/____'}</td>
              </tr>
              <tr>
                <td colspan="2"><strong>الموظف المكلف بالعمل أثناء الإجازة:</strong> ${vals.substituteEmployee || '________________'}</td>
              </tr>
            </tbody>
          </table>
          <div class="doc-box-section" style="margin-top:12px;">
            <p>أرجو التكرم بالموافقة على منحي الإجازة الموضحة بياناتها أعلاه، وأقر بتسليم كافة المهام العاجلة للموظف البديل قبل بدء الإجازة.</p>
            <div style="display:flex; justify-content:space-between; margin-top:10px; padding-top:8px; border-top:1px dashed #cbd5e1;">
              <span><strong>توقيع الموظف:</strong> ________________</span>
              <span><strong>موافقة المدير المباشر:</strong> ________________</span>
            </div>
          </div>
        </div>
      `;
    }
  },

  // 5. إخلاء طرف (نموذج 21 - ظاهر في قائمة ui ux.jpeg)
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
      { key: 'employeeId', labelAr: 'الرقم الوظيفي', labelEn: 'Employee ID', type: 'text', defaultValue: 'EMP-1042' },
      { key: 'jobTitle', labelAr: 'المسمى الوظيفي', labelEn: 'Job Title', type: 'text', defaultValue: 'مستشار إداري' },
      { key: 'department', labelAr: 'القسم الوظيفي', labelEn: 'Department', type: 'text', defaultValue: 'الإدارة العامة' },
      { key: 'lastWorkDay', labelAr: 'تاريخ آخر يوم عمل', labelEn: 'Last Working Day', type: 'text', defaultValue: '2026/10/30' },
      { key: 'reason', labelAr: 'سبب إخلاء الطرف', labelEn: 'Clearance Reason', type: 'select', options: ['انتهاء عقد العمل', 'إجازة سنوية', 'استقالة', 'نقل بين الإدارات'], defaultValue: 'انتهاء عقد العمل' }
    ],
    renderHtml: (vals) => {
      return `
        <div class="doc-body-content doc-compact">
          <table class="doc-form-table">
            <tbody>
              <tr>
                <td><strong>اسم الموظف:</strong> ${vals.employeeName || '________________'}</td>
                <td><strong>الرقم الوظيفي:</strong> ${vals.employeeId || '________'}</td>
              </tr>
              <tr>
                <td><strong>المسمى الوظيفي:</strong> ${vals.jobTitle || '________________'}</td>
                <td><strong>القسم:</strong> ${vals.department || '________________'}</td>
              </tr>
              <tr>
                <td><strong>سبب إخلاء الطرف:</strong> ${vals.reason || '________________'}</td>
                <td><strong>تاريخ آخر يوم عمل:</strong> ${vals.lastWorkDay || '____/____/____'}</td>
              </tr>
            </tbody>
          </table>

          <p style="margin:10px 0 6px; font-weight:700; color:#162538;">اعتماد الإدارات المعنية بتسليم العهد والالتزامات:</p>
          <table class="doc-form-table">
            <thead>
              <tr style="background:#f1f5f9;">
                <th>الجهة / الإدارة</th>
                <th>حالة العهدة / الالتزام</th>
                <th>المسؤول المختص</th>
                <th>التوقيع</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>الإدارة المباشرة (ملفات العمل)</td>
                <td>تم الاستلام ولا توجد ملاحظات</td>
                <td>________________</td>
                <td>__________</td>
              </tr>
              <tr>
                <td>تقنية المعلومات (أجهزة / حسابات)</td>
                <td>تم الاستلام ولا توجد ملاحظات</td>
                <td>________________</td>
                <td>__________</td>
              </tr>
              <tr>
                <td>الشؤون المالية (سلف / عهد مالية)</td>
                <td>بريء الذمة مالياً</td>
                <td>________________</td>
                <td>__________</td>
              </tr>
              <tr>
                <td>الموارد البشرية (بطاقة العمل / التأمين الصحي)</td>
                <td>تم استكمال الإجراءات</td>
                <td>________________</td>
                <td>__________</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    }
  },

  // 6. نموذج طلب توظيف (نموذج 2 من ملف 5-namathej.pdf)
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
      { key: 'appDate', labelAr: 'التاريخ / Date', labelEn: 'Date', type: 'text', defaultValue: '2026/10/23' },
      { key: 'fullName', labelAr: 'الاسم الكامل / Full Name', labelEn: 'Full Name', type: 'text', defaultValue: 'أسامة بكر' },
      { key: 'nationality', labelAr: 'الجنسية / Nationality', labelEn: 'Nationality', type: 'text', defaultValue: 'سعودي' },
      { key: 'idNumber', labelAr: 'رقم الهوية/الإقامة / ID No', labelEn: 'ID/Iqama No', type: 'text', defaultValue: '1088776655' },
      { key: 'mobile', labelAr: 'رقم الجوال / Mobile', labelEn: 'Mobile', type: 'text', defaultValue: '0550001122' },
      { key: 'email', labelAr: 'البريد الإلكتروني / Email', labelEn: 'Email', type: 'text', defaultValue: 'osama@company.sa' },
      { key: 'positionApplied', labelAr: 'الوظيفة المتقدم لها / Position', labelEn: 'Position Applied For', type: 'text', defaultValue: 'مستشار إداري' },
      { key: 'degree', labelAr: 'المؤهل العلمي / Degree', labelEn: 'Degree', type: 'text', defaultValue: 'بكالوريوس' },
      { key: 'major', labelAr: 'التخصص / Major', labelEn: 'Major', type: 'text', defaultValue: 'إدارة أعمال' },
      { key: 'gradYear', labelAr: 'سنة التخرج / Year', labelEn: 'Graduation Year', type: 'text', defaultValue: '2020' },
      { key: 'exp1Company', labelAr: 'الشركة السابقة (1) / Company', labelEn: 'Company 1', type: 'text', defaultValue: 'شركة الأفق للاستشارات' },
      { key: 'exp1Title', labelAr: 'المسمى (1) / Title', labelEn: 'Title 1', type: 'text', defaultValue: 'أخصائي إداري' },
      { key: 'exp1Period', labelAr: 'الفترة (1) / Period', labelEn: 'Period 1', type: 'text', defaultValue: '2021 - 2025' }
    ],
    renderHtml: (vals) => {
      return `
        <div class="doc-body-content doc-compact">
          <table class="doc-form-table">
            <tbody>
              <tr>
                <td><strong>التاريخ / Date:</strong> ${vals.appDate || '____/____/________'}</td>
                <td colspan="3"><strong>الاسم الكامل / Full Name:</strong> ${vals.fullName || '___________________________'}</td>
              </tr>
              <tr>
                <td colspan="2"><strong>الجنسية / Nationality:</strong> ${vals.nationality || '________________'}</td>
                <td colspan="2"><strong>رقم الهوية/الإقامة / ID/Iqama No:</strong> ${vals.idNumber || '________________'}</td>
              </tr>
              <tr>
                <td colspan="2"><strong>رقم الجوال / Mobile:</strong> ${vals.mobile || '________________'}</td>
                <td colspan="2"><strong>البريد الإلكتروني / Email:</strong> ${vals.email || '________________'}</td>
              </tr>
              <tr>
                <td colspan="4"><strong>الوظيفة المتقدم لها / Position Applied For:</strong> ${vals.positionApplied || '___________________________'}</td>
              </tr>
            </tbody>
          </table>

          <div class="doc-box-section" style="margin-top:8px;">
            <p><strong>المؤهلات العلمية / Educational Qualifications:</strong></p>
            <table class="doc-form-table" style="margin-top:4px;">
              <tbody>
                <tr>
                  <td><strong>المؤهل / Degree:</strong> ${vals.degree || '___________'}</td>
                  <td><strong>التخصص / Major:</strong> ${vals.major || '___________'}</td>
                  <td><strong>السنة / Year:</strong> ${vals.gradYear || '______'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="doc-box-section" style="margin-top:8px;">
            <p><strong>الخبرات العملية / Work Experience:</strong></p>
            <table class="doc-form-table" style="margin-top:4px;">
              <tbody>
                <tr>
                  <td><strong>1. الشركة / Company:</strong> ${vals.exp1Company || '___________'}</td>
                  <td><strong>المسمى / Title:</strong> ${vals.exp1Title || '___________'}</td>
                  <td><strong>الفترة / Period:</strong> ${vals.exp1Period || '______'}</td>
                </tr>
                <tr>
                  <td><strong>2. الشركة / Company:</strong> _______________</td>
                  <td><strong>المسمى / Title:</strong> _______________</td>
                  <td><strong>الفترة / Period:</strong> ________</td>
                </tr>
              </tbody>
            </table>
            <div style="margin-top:10px; padding-top:6px; border-top:1px dashed #cbd5e1;">
              <strong>توقيع المتقدم / Applicant Signature:</strong> ________________________
            </div>
          </div>
        </div>
      `;
    }
  },

  // 7. نموذج إقرار مباشرة عمل (نموذج 3 من ملف 5-namathej.pdf)
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
      { key: 'docDate', labelAr: 'التاريخ / Date', labelEn: 'Date', type: 'text', defaultValue: '2026/10/23' },
      { key: 'employeeName', labelAr: 'اسم الموظف / Employee Name', labelEn: 'Employee Name', type: 'text', defaultValue: 'أسامة بكر' },
      { key: 'employeeId', labelAr: 'الرقم الوظيفي / Employee ID', labelEn: 'Employee ID', type: 'text', defaultValue: 'EMP-1042' },
      { key: 'position', labelAr: 'المسمى الوظيفي / Position', labelEn: 'Position', type: 'text', defaultValue: 'مستشار إداري' },
      { key: 'department', labelAr: 'القسم / Department', labelEn: 'Department', type: 'text', defaultValue: 'الإدارة العامة' },
      { key: 'joiningDate', labelAr: 'تاريخ المباشرة / Joining Date', labelEn: 'Joining Date', type: 'text', defaultValue: '2026/10/23' }
    ],
    renderHtml: (vals) => {
      return `
        <div class="doc-body-content doc-compact">
          <table class="doc-form-table">
            <tbody>
              <tr>
                <td><strong>التاريخ / Date:</strong> ${vals.docDate || '____/____/________'}</td>
                <td><strong>الرقم الوظيفي / Employee ID:</strong> ${vals.employeeId || '____________'}</td>
              </tr>
              <tr>
                <td><strong>اسم الموظف / Employee Name:</strong> ${vals.employeeName || '____________________'}</td>
                <td><strong>الوظيفة / Position:</strong> ${vals.position || '____________________'}</td>
              </tr>
              <tr>
                <td><strong>القسم / Department:</strong> ${vals.department || '____________________'}</td>
                <td><strong>تاريخ المباشرة / Joining Date:</strong> ${vals.joiningDate || '____/____/________'}</td>
              </tr>
            </tbody>
          </table>

          <div class="doc-box-section" style="margin-top:12px;">
            <p style="font-size:1.02em; font-weight:600; margin-bottom:4px;">
              أقر أنا الموظف المذكور أعلاه بأنني قد باشرت عملي فعلياً لدى الشركة بتاريخ اليوم الموضح أعلاه.
            </p>
            <p dir="ltr" style="text-align:left; font-size:0.9em; color:#334155;">
              I hereby confirm that I have officially commenced my duties on the date mentioned above.
            </p>
          </div>

          <div class="doc-box-section" style="margin-top:12px;">
            <p style="margin-bottom:8px;"><strong>توقيع الموظف / Employee Signature:</strong> ________________________</p>
            <p style="margin-bottom:8px;"><strong>اعتماد المدير المباشر / Line Manager Approval:</strong> ________________________</p>
            <p><strong>اعتماد الموارد البشرية / HR Approval:</strong> ________________________</p>
          </div>
        </div>
      `;
    }
  },

  // 8. نموذج تحديث بيانات الموظف (نموذج 4 من ملف 5-namathej.pdf)
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
      { key: 'docDate', labelAr: 'التاريخ / Date', labelEn: 'Date', type: 'text', defaultValue: '2026/10/23' },
      { key: 'employeeName', labelAr: 'اسم الموظف / Employee Name', labelEn: 'Employee Name', type: 'text', defaultValue: 'أسامة بكر' },
      { key: 'employeeId', labelAr: 'الرقم الوظيفي / Employee ID', labelEn: 'Employee ID', type: 'text', defaultValue: 'EMP-1042' },
      { key: 'mobileNo', labelAr: 'رقم الجوال الجديد / Mobile No', labelEn: 'Mobile No', type: 'text', defaultValue: '0501234567' },
      { key: 'nationalAddress', labelAr: 'العنوان الوطني / National Address', labelEn: 'National Address', type: 'text', defaultValue: 'الرياض - حي العليا - الرمز 12211' },
      { key: 'emergencyName', labelAr: 'اسم شخص عند الطوارئ', labelEn: 'Emergency Contact Name', type: 'text', defaultValue: 'أحمد بكر' },
      { key: 'emergencyRelation', labelAr: 'صلة القرابة / Relation', labelEn: 'Relation', type: 'text', defaultValue: 'أخ' },
      { key: 'emergencyPhone', labelAr: 'رقم جوال الطوارئ / Phone', labelEn: 'Emergency Phone', type: 'text', defaultValue: '0507654321' },
      { key: 'iban', labelAr: 'الحساب البنكي (IBAN)', labelEn: 'Bank IBAN', type: 'text', defaultValue: 'SA0000000000000000000000' }
    ],
    renderHtml: (vals) => {
      return `
        <div class="doc-body-content doc-compact">
          <table class="doc-form-table">
            <tbody>
              <tr>
                <td><strong>التاريخ / Date:</strong> ${vals.docDate || '____/____/________'}</td>
                <td><strong>الرقم الوظيفي / Employee ID:</strong> ${vals.employeeId || '____________'}</td>
              </tr>
              <tr>
                <td colspan="2"><strong>اسم الموظف / Employee Name:</strong> ${vals.employeeName || '___________________________'}</td>
              </tr>
            </tbody>
          </table>

          <div class="doc-box-section" style="margin-top:10px;">
            <p style="font-weight:700; color:#162538; margin-bottom:6px;">البيانات الشخصية الجديدة / Updated Personal Details:</p>
            <table class="doc-form-table">
              <tbody>
                <tr>
                  <td colspan="2"><strong>رقم الجوال / Mobile No:</strong> ${vals.mobileNo || '____________________'}</td>
                </tr>
                <tr>
                  <td colspan="2"><strong>العنوان الوطني / National Address:</strong> ${vals.nationalAddress || '___________________________'}</td>
                </tr>
                <tr>
                  <td colspan="2"><strong>اسم شخص عند الطوارئ / Emergency Contact Name:</strong> ${vals.emergencyName || '_______________________'}</td>
                </tr>
                <tr>
                  <td><strong>صلة القرابة / Relation:</strong> ${vals.emergencyRelation || '_______________'}</td>
                  <td><strong>رقم الجوال / Phone:</strong> ${vals.emergencyPhone || '_______________'}</td>
                </tr>
                <tr>
                  <td colspan="2"><strong>الحساب البنكي (IBAN) / IBAN:</strong> <span dir="ltr">${vals.iban || '___________________________'}</span></td>
                </tr>
              </tbody>
            </table>
            <div style="margin-top:10px; padding-top:6px; border-top:1px dashed #cbd5e1;">
              <strong>توقيع الموظف / Employee Signature:</strong> ________________________
            </div>
          </div>
        </div>
      `;
    }
  },

  // 9. نموذج تقييم فترة التجربة (نموذج 5 من ملف 5-namathej.pdf)
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
      { key: 'docDate', labelAr: 'التاريخ / Date', labelEn: 'Date', type: 'text', defaultValue: '2026/10/23' },
      { key: 'employeeName', labelAr: 'اسم الموظف / Employee Name', labelEn: 'Employee Name', type: 'text', defaultValue: 'أسامة بكر' },
      { key: 'employeeId', labelAr: 'الرقم الوظيفي / Employee ID', labelEn: 'Employee ID', type: 'text', defaultValue: 'EMP-1042' },
      { key: 'position', labelAr: 'المسمى الوظيفي / Position', labelEn: 'Position', type: 'text', defaultValue: 'مستشار إداري' },
      { key: 'department', labelAr: 'القسم / Department', labelEn: 'Department', type: 'text', defaultValue: 'الإدارة العامة' },
      { key: 'probationDuration', labelAr: 'مدة فترة التجربة (أشهر)', labelEn: 'Probation Duration (Months)', type: 'text', defaultValue: '3' },
      { key: 'startDate', labelAr: 'تاريخ بداية العمل / Start Date', labelEn: 'Start Date', type: 'text', defaultValue: '2026/07/23' },
      { key: 'endDate', labelAr: 'تاريخ نهاية التجربة / End Date', labelEn: 'End Date', type: 'text', defaultValue: '2026/10/23' },
      { key: 'rating', labelAr: 'التقدير العام للأداء', labelEn: 'Overall Performance Rating', type: 'select', options: ['ممتاز (Excellent)', 'جيد جداً (Very Good)', 'جيد (Good)', 'يحتاج تحسين (Needs Improvement)'], defaultValue: 'ممتاز (Excellent)' },
      { key: 'recommendation', labelAr: 'توصية المدير المباشر', labelEn: 'Manager Recommendation', type: 'select', options: ['تثبيت الموظف في الوظيفة', 'تمديد فترة التجربة', 'إنهاء العلاقة التعاقدية خلال فترة التجربة'], defaultValue: 'تثبيت الموظف في الوظيفة' }
    ],
    renderHtml: (vals) => {
      return `
        <div class="doc-body-content doc-compact">
          <table class="doc-form-table">
            <tbody>
              <tr>
                <td><strong>التاريخ / Date:</strong> ${vals.docDate || '____/____/________'}</td>
                <td><strong>اسم الموظف / Employee Name:</strong> ${vals.employeeName || '____________________'}</td>
              </tr>
              <tr>
                <td><strong>المسمى الوظيفي / Position:</strong> ${vals.position || '_______________'}</td>
                <td><strong>الرقم الوظيفي / Employee ID:</strong> ${vals.employeeId || '____________'}</td>
              </tr>
              <tr>
                <td><strong>القسم / Department:</strong> ${vals.department || '____________________'}</td>
                <td><strong>مدة فترة التجربة / Probation Duration:</strong> ${vals.probationDuration || '3'} Months / أشهر</td>
              </tr>
              <tr>
                <td><strong>تاريخ بداية العمل / Start Date:</strong> ${vals.startDate || '____/____/________'}</td>
                <td><strong>تاريخ نهاية التجربة / End Date:</strong> ${vals.endDate || '____/____/________'}</td>
              </tr>
            </tbody>
          </table>

          <div class="doc-box-section" style="margin-top:10px;">
            <p><strong>نتيجة التقييم والتوصية / Evaluation Result & Recommendation:</strong></p>
            <table class="doc-form-table" style="margin-top:6px;">
              <tbody>
                <tr>
                  <td><strong>التقدير العام للأداء:</strong></td>
                  <td>${vals.rating || 'ممتاز (Excellent)'}</td>
                </tr>
                <tr>
                  <td><strong>توصية المدير المباشر:</strong></td>
                  <td><strong>${vals.recommendation || 'تثبيت الموظف في الوظيفة'}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
  }
];
