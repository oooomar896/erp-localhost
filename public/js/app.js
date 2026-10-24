/**
 * المنطق الرئيسي لبرنامج نماذج الموارد البشرية — دار تول للاستشارات
 */

const STORAGE_KEY = 'DARTOOL_HR_WORKSPACE_V1';

const CATEGORY_ICONS = {
  doc: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  users: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  wallet: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`,
  shield: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
  cap: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  chart: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="18" x2="9" y2="15"/><line x1="15" y1="18" x2="15" y2="14"/></svg>`,
  heart: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/><polyline points="8 12 11 12 12 9 14 15 15 12 17 12"/></svg>`,
  gear: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`
};

const appState = {
  uiLang: 'ar', // 'ar' | 'en'
  selectedCategory: 'all',
  formLangFilter: 'all', // 'all' | 'ar' | 'en'
  searchQuery: '',
  selectedFormId: 'form-15',
  isBlankLetterMode: false,
  isDirectEditing: false,
  isTableCollapsed: false,
  zoomPercent: 100,
  showDecorativeFrame: true,
  customTemplates: [],
  formValuesById: {},
  customEditedHtmlById: {},
  company: {
    nameAr: 'شركة التقنية المتقدمة',
    nameEn: 'Advanced Technology Company',
    cr: '1010500123',
    phone: '0114000000',
    email: 'hr@company.sa',
    postal: '12345',
    managerName: '',
    docDate: '2026/10/23',
    logoDataUrl: '',
    signatureDataUrl: '',
    stampDataUrl: '',
    isSampleData: true
  },
  license: {
    activated: false,
    deviceId: '',
    clientName: 'العميل',
    type: ''
  }
};

// =========================================================
// 1. INITIALIZATION & DEVICE LICENSE VERIFICATION
// =========================================================
window.addEventListener('DOMContentLoaded', async () => {
  await checkDeviceLicense();
});

async function checkDeviceLicense() {
  try {
    let status;
    if (window.darToolDesktop && window.darToolDesktop.getLicenseStatus) {
      status = await window.darToolDesktop.getLicenseStatus();
    } else {
      const res = await fetch('/api/license/status');
      status = await res.json();
    }

    appState.license = status;
    document.getElementById('displayDeviceId').textContent = status.deviceId || 'DT-XXXX-XXXX-XXXX';
    document.getElementById('settingsDeviceId').textContent = status.deviceId || '';

    if (status.activated) {
      unlockApplication(status);
    } else {
      document.getElementById('licenseOverlay').classList.remove('hidden');
    }
  } catch (err) {
    console.error('License verification error:', err);
  }
}

async function submitLicenseActivation() {
  const keyInput = document.getElementById('activationKeyInput').value.trim();
  const clientInput = document.getElementById('activationClientInput').value.trim();
  const errBox = document.getElementById('licenseErrorBox');

  errBox.style.display = 'none';
  if (!keyInput) {
    errBox.textContent = 'يرجى إدخال رمز التفعيل الخاص بجهازك.';
    errBox.style.display = 'block';
    return;
  }

  try {
    let result;
    if (window.darToolDesktop && window.darToolDesktop.activateLicense) {
      result = await window.darToolDesktop.activateLicense(keyInput, clientInput);
    } else {
      const res = await fetch('/api/license/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activationKey: keyInput, clientName: clientInput })
      });
      result = await res.json();
    }

    if (!result.success) {
      errBox.textContent = result.message || 'رمز التفعيل غير صالح لهذا الجهاز.';
      errBox.style.display = 'block';
      return;
    }

    showToast('✅ تم تفعيل البرنامج وربطه بهذا الجهاز بنجاح!');
    unlockApplication(result);
  } catch (e) {
    errBox.textContent = 'حدث خطأ أثناء التحقق من رمز التفعيل.';
    errBox.style.display = 'block';
  }
}

async function unlockApplication(licenseInfo) {
  document.getElementById('licenseOverlay').classList.add('hidden');
  if (licenseInfo.clientName && licenseInfo.clientName !== 'عميل معتمد') {
    document.getElementById('headerClientName').textContent = licenseInfo.clientName;
  }
  document.getElementById('settingsLicenseType').textContent = licenseInfo.type || 'مفعّل';

  await loadSavedWorkspace();
  initDefaultFormValues();
  renderAllUI();
}

function copyDeviceId(btn) {
  const idText = document.getElementById('displayDeviceId').textContent.trim();
  navigator.clipboard.writeText(idText);
  const old = btn.textContent;
  btn.textContent = '✅ تم النسخ';
  setTimeout(() => { btn.textContent = old; }, 1800);
}

// =========================================================
// 2. WORKSPACE LOCAL PERSISTENCE (DISK + LOCALSTORAGE)
// =========================================================
function getAllTemplates() {
  const customHydrated = (appState.customTemplates || []).map(tpl => ({
    ...tpl,
    renderHtml: (vals) => {
      let text = tpl.bodyTemplate || '';
      text = text
        .replace(/\{اسم_الموظف\}/g, vals.employeeName || '________________')
        .replace(/\{المسمى_الوظيفي\}/g, vals.jobTitle || '________________')
        .replace(/\{القسم\}/g, vals.department || '________________');
      return `<div class="doc-body-content"><p class="doc-paragraph" style="white-space:pre-line;">${text}</p></div>`;
    }
  }));
  return [...window.DEFAULT_HR_TEMPLATES, ...customHydrated];
}

function initDefaultFormValues() {
  const all = getAllTemplates();
  all.forEach(tpl => {
    if (!appState.formValuesById[tpl.id]) {
      appState.formValuesById[tpl.id] = {};
      (tpl.fields || []).forEach(f => {
        appState.formValuesById[tpl.id][f.key] = f.defaultValue || '';
      });
    }
  });
}

async function loadSavedWorkspace() {
  // Try loading from local disk API first
  try {
    const res = await fetch('/api/workspace/load');
    if (res.ok) {
      const payload = await res.json();
      if (payload.exists && payload.data) {
        applyLoadedWorkspace(payload.data);
        return;
      }
    }
  } catch (_) {}

  // Fallback to browser localStorage
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      applyLoadedWorkspace(JSON.parse(raw));
    }
  } catch (_) {}
}

function applyLoadedWorkspace(saved) {
  if (!saved) return;
  if (saved.company) appState.company = { ...appState.company, ...saved.company };
  if (saved.customTemplates) appState.customTemplates = saved.customTemplates;
  if (saved.formValuesById) appState.formValuesById = { ...appState.formValuesById, ...saved.formValuesById };
  if (saved.selectedFormId) appState.selectedFormId = saved.selectedFormId;
  if (typeof saved.showDecorativeFrame === 'boolean') {
    appState.showDecorativeFrame = saved.showDecorativeFrame;
    document.getElementById('chkShowDecorFrame').checked = saved.showDecorativeFrame;
  }
  if (saved.uiLang) appState.uiLang = saved.uiLang;
}

async function persistWorkspaceQuietly() {
  const snapshot = {
    company: appState.company,
    customTemplates: appState.customTemplates,
    formValuesById: appState.formValuesById,
    selectedFormId: appState.selectedFormId,
    showDecorativeFrame: appState.showDecorativeFrame,
    uiLang: appState.uiLang,
    updatedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch (_) {}

  try {
    await fetch('/api/workspace/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(snapshot)
    });
  } catch (_) {}
}

async function saveCurrentWorkspaceManual() {
  await persistWorkspaceQuietly();
  showToast(appState.uiLang === 'en' ? '✅ Changes saved locally' : '✅ تم حفظ جميع البيانات والتعديلات محلياً');
}

// =========================================================
// 3. RENDER UI & COMPONENTS
// =========================================================
function renderAllUI() {
  applyLanguageTranslations();
  renderCompanySummaryAndLetterhead();
  renderCategoriesGrid();
  renderFormsTable();
  renderDynamicFieldsEditor();
  renderLiveDocumentPreview();
  toggleA4FrameSetting(appState.showDecorativeFrame, false);
}

function renderCompanySummaryAndLetterhead() {
  const c = appState.company;

  // Sidebar Summary
  document.getElementById('summaryCompName').textContent = c.nameAr || c.nameEn || '—';
  document.getElementById('summaryCompCr').textContent = c.cr || '—';
  document.getElementById('summaryCompPhone').textContent = c.phone || '—';
  document.getElementById('summaryCompEmail').textContent = c.email || '—';
  document.getElementById('summaryCompPostal').textContent = c.postal || '—';

  const sampleBadge = document.getElementById('sampleDataNotice');
  if (sampleBadge) {
    sampleBadge.style.display = c.isSampleData ? 'block' : 'none';
  }

  // A4 Letterhead Meta (Hide row if empty so no awkward blanks appear - Test Case 8)
  const setMetaRow = (rowId, valId, val) => {
    const rowEl = document.getElementById(rowId);
    const valEl = document.getElementById(valId);
    if (!val || !val.trim()) {
      rowEl.style.display = 'none';
    } else {
      rowEl.style.display = 'block';
      valEl.textContent = val;
    }
  };

  setMetaRow('docMetaCrRow', 'docCompCr', c.cr);
  setMetaRow('docMetaPhoneRow', 'docCompPhone', c.phone);
  setMetaRow('docMetaEmailRow', 'docCompEmail', c.email);
  setMetaRow('docMetaPostalRow', 'docCompPostal', c.postal);

  document.getElementById('docCompNameAr').textContent = c.nameAr || '';
  document.getElementById('docCompNameEn').textContent = c.nameEn || '';
  document.getElementById('docCurrentDate').textContent = c.docDate || new Date().toISOString().slice(0, 10).replace(/-/g, '/');

  // Stamp & Manager Name
  document.getElementById('stampCompName').textContent = c.nameAr || c.nameEn || '';
  document.getElementById('stampCompCr').textContent = c.cr || '';
  document.getElementById('docManagerNameDisplay').textContent = c.managerName || '';

  // Client Logo
  const defaultSvg = document.getElementById('defaultClientBuildingSvg');
  const uploadedLogo = document.getElementById('docClientUploadedLogo');
  if (c.logoDataUrl) {
    defaultSvg.style.display = 'none';
    uploadedLogo.src = c.logoDataUrl;
    uploadedLogo.style.display = 'block';
  } else {
    defaultSvg.style.display = 'block';
    uploadedLogo.style.display = 'none';
  }

  // Client Signature
  const defaultSig = document.getElementById('defaultSignatureSvg');
  const uploadedSig = document.getElementById('docUploadedSignature');
  if (c.signatureDataUrl) {
    defaultSig.style.display = 'none';
    uploadedSig.src = c.signatureDataUrl;
    uploadedSig.style.display = 'block';
  } else {
    defaultSig.style.display = 'block';
    uploadedSig.style.display = 'none';
  }

  // Client Stamp
  const defaultStamp = document.getElementById('defaultStampContent');
  const uploadedStamp = document.getElementById('docUploadedStamp');
  if (c.stampDataUrl) {
    defaultStamp.style.display = 'none';
    uploadedStamp.src = c.stampDataUrl;
    uploadedStamp.style.display = 'block';
  } else {
    defaultStamp.style.display = 'flex';
    uploadedStamp.style.display = 'none';
  }
}

function renderCategoriesGrid() {
  const container = document.getElementById('categoriesGrid');
  container.innerHTML = window.HR_CATEGORIES.map(cat => {
    const isActive = appState.selectedCategory === cat.id;
    const label = appState.uiLang === 'en' ? cat.nameEn : cat.nameAr;
    return `
      <div class="category-card ${isActive ? 'active' : ''}" onclick="selectCategory('${cat.id}')">
        <div class="cat-icon">${CATEGORY_ICONS[cat.icon] || CATEGORY_ICONS.doc}</div>
        <div class="cat-name">${label}</div>
        <div class="cat-count">(${cat.badgeCount})</div>
      </div>
    `;
  }).join('');
}

function getFilteredTemplates() {
  const all = getAllTemplates();
  const q = (appState.searchQuery || '').trim().toLowerCase();

  return all.filter(tpl => {
    if (appState.selectedCategory !== 'all') {
      if (tpl.category !== appState.selectedCategory && tpl.secondaryCategory !== appState.selectedCategory) {
        return false;
      }
    }
    if (appState.formLangFilter === 'ar' && tpl.langType === 'en') return false;
    if (appState.formLangFilter === 'en' && tpl.langType === 'ar' && !tpl.titleEn) return false;

    if (q) {
      const catObj = window.HR_CATEGORIES.find(c => c.id === tpl.category);
      const catName = catObj ? `${catObj.nameAr} ${catObj.nameEn}`.toLowerCase() : '';
      const haystack = `${tpl.titleAr} ${tpl.titleEn || ''} ${tpl.docHeadingAr || ''} ${catName} ${tpl.number || ''}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

function renderFormsTable() {
  const tbody = document.getElementById('formsTableBody');
  const filtered = getFilteredTemplates();

  const activeCatObj = window.HR_CATEGORIES.find(c => c.id === appState.selectedCategory);
  const badgeTotal = appState.searchQuery
    ? filtered.length
    : (activeCatObj ? activeCatObj.badgeCount : 72);
  document.getElementById('formsCountBadge').textContent = `(${badgeTotal})`;

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center; padding:18px; color:#64748b;">
          لا توجد نماذج مطابقة لبحثك. يمكنك الضغط على (إنشاء خطاب جديد) أو (+ نموذج مخصص).
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map((tpl, idx) => {
    const isSelected = !appState.isBlankLetterMode && appState.selectedFormId === tpl.id;
    const catObj = window.HR_CATEGORIES.find(c => c.id === tpl.category);
    const catLabel = catObj ? (appState.uiLang === 'en' ? catObj.nameEn : catObj.nameAr) : '';
    const formTitle = appState.uiLang === 'en' ? (tpl.titleEn || tpl.titleAr) : tpl.titleAr;

    return `
      <tr class="${isSelected ? 'selected' : ''}" onclick="selectFormTemplate('${tpl.id}')">
        <td>${idx + 1}</td>
        <td>
          <div class="form-name-cell">
            <span class="form-doc-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </span>
            <span>${formTitle}</span>
          </div>
        </td>
        <td style="text-align:center; color:#475569;">${catLabel}</td>
        <td style="text-align:center;">
          <span class="radio-circle"></span>
        </td>
      </tr>
    `;
  }).join('');
}

function renderDynamicFieldsEditor() {
  const box = document.getElementById('fieldsEditorBox');
  const grid = document.getElementById('dynamicFieldsGrid');

  if (appState.isBlankLetterMode) {
    box.style.display = 'block';
    grid.innerHTML = `
      <div class="field-item" style="grid-column: 1 / -1;">
        <label>أنت الآن في وضع <strong>إنشاء خطاب جديد (فارغ)</strong> — يمكنك الكتابة مباشرة داخل ورقة الخطاب على اليسار أو تعديل العنوان كما تشاء.</label>
      </div>
    `;
    return;
  }

  const tpl = getAllTemplates().find(t => t.id === appState.selectedFormId);
  if (!tpl || !tpl.fields || tpl.fields.length === 0) {
    box.style.display = 'none';
    return;
  }

  box.style.display = 'block';
  const currentVals = appState.formValuesById[tpl.id] || {};

  grid.innerHTML = tpl.fields.map(field => {
    const val = currentVals[field.key] !== undefined ? currentVals[field.key] : (field.defaultValue || '');
    const label = appState.uiLang === 'en' ? (field.labelEn || field.labelAr) : field.labelAr;
    const suffix = appState.uiLang === 'en' ? field.suffixEn : field.suffixAr;

    if (field.type === 'select') {
      const optsHtml = (field.options || []).map(opt =>
        `<option value="${opt}" ${opt === val ? 'selected' : ''}>${opt}</option>`
      ).join('');
      return `
        <div class="field-item">
          <label>${label}</label>
          <div class="field-control-wrap">
            <select onchange="handleDynamicFieldChange('${tpl.id}', '${field.key}', this.value)">
              ${optsHtml}
            </select>
          </div>
        </div>
      `;
    }

    return `
      <div class="field-item">
        <label>${label}</label>
        <div class="field-control-wrap">
          <input
            type="text"
            value="${escapeHtmlAttr(val)}"
            oninput="handleDynamicFieldChange('${tpl.id}', '${field.key}', this.value)"
          />
          ${suffix ? `<span class="field-suffix">${suffix}</span>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function renderLiveDocumentPreview() {
  const headingEl = document.getElementById('docMainHeading');
  const bodyEl = document.getElementById('docEditableBody');
  const blankBtn = document.getElementById('btnBlankLetter');

  if (appState.isBlankLetterMode) {
    blankBtn.classList.add('active');
    headingEl.textContent = appState.uiLang === 'en' ? 'OFFICIAL LETTER' : 'خطاب رسمي';
    bodyEl.innerHTML = `
      <div class="doc-body-content" style="min-height:240px;">
        <p class="doc-salutation">${appState.uiLang === 'en' ? 'To Whom It May Concern,' : 'السادة / .................................................. المحترمين،،'}</p>
        <p class="doc-paragraph">${appState.uiLang === 'en' ? 'Type your letter content here...' : 'السلام عليكم ورحمة الله وبركاته،،،'}</p>
        <p class="doc-paragraph"></p>
      </div>
    `;
    enableDirectDocEditing(true);
    return;
  }

  blankBtn.classList.remove('active');
  const tpl = getAllTemplates().find(t => t.id === appState.selectedFormId) || getAllTemplates()[0];
  if (!tpl) return;

  const effectiveLang = appState.formLangFilter === 'en' ? 'en' : appState.uiLang;
  headingEl.textContent = effectiveLang === 'en'
    ? (tpl.docHeadingEn || tpl.docHeadingAr)
    : tpl.docHeadingAr;

  const vals = appState.formValuesById[tpl.id] || {};
  bodyEl.innerHTML = tpl.renderHtml(vals, appState.company, effectiveLang);
}

// =========================================================
// 4. INTERACTIONS: SELECT FORM, EDIT FIELDS, BLANK LETTER
// =========================================================
function selectCategory(catId) {
  appState.selectedCategory = catId;
  renderCategoriesGrid();
  renderFormsTable();
}

function setFormLangFilter(filterVal, btnEl) {
  appState.formLangFilter = filterVal;
  document.querySelectorAll('.lang-tab-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderFormsTable();
  renderLiveDocumentPreview();
}

function handleSearchAndFilter() {
  appState.searchQuery = document.getElementById('formSearchInput').value;
  renderFormsTable();
}

function toggleFormsTable() {
  appState.isTableCollapsed = !appState.isTableCollapsed;
  const container = document.getElementById('formsTableContainer');
  const btn = document.getElementById('btnToggleTable');
  if (appState.isTableCollapsed) {
    container.classList.add('collapsed');
    btn.textContent = appState.uiLang === 'en' ? 'Show Table' : 'إظهار الجدول';
  } else {
    container.classList.remove('collapsed');
    btn.textContent = appState.uiLang === 'en' ? 'Hide Table' : 'إخفاء الجدول';
  }
}

function selectFormTemplate(formId) {
  appState.isBlankLetterMode = false;
  appState.selectedFormId = formId;
  enableDirectDocEditing(false);
  renderFormsTable();
  renderDynamicFieldsEditor();
  renderLiveDocumentPreview();
  persistWorkspaceQuietly();
}

function handleDynamicFieldChange(formId, fieldKey, newValue) {
  if (!appState.formValuesById[formId]) {
    appState.formValuesById[formId] = {};
  }
  appState.formValuesById[formId][fieldKey] = newValue;

  // Auto-calculate totalSalary in Job Offer Form (form-1) if basic/housing/transport change
  if (formId === 'form-1' && ['basicSalary', 'housingAllowance', 'transportAllowance'].includes(fieldKey)) {
    const v = appState.formValuesById[formId];
    const b = parseFloat((v.basicSalary || '0').replace(/,/g, '')) || 0;
    const h = parseFloat((v.housingAllowance || '0').replace(/,/g, '')) || 0;
    const t = parseFloat((v.transportAllowance || '0').replace(/,/g, '')) || 0;
    const sum = b + h + t;
    if (sum > 0) {
      v.totalSalary = sum.toLocaleString('en-US');
      renderDynamicFieldsEditor();
    }
  }

  renderLiveDocumentPreview();
  persistWorkspaceQuietly();
}

function clearCurrentFormInputs() {
  if (appState.isBlankLetterMode) {
    activateBlankLetterMode();
    return;
  }
  const tpl = getAllTemplates().find(t => t.id === appState.selectedFormId);
  if (!tpl) return;
  appState.formValuesById[tpl.id] = {};
  (tpl.fields || []).forEach(f => {
    appState.formValuesById[tpl.id][f.key] = '';
  });
  renderDynamicFieldsEditor();
  renderLiveDocumentPreview();
  showToast('تم تفريغ حقول النموذج الحالي');
}

function activateBlankLetterMode() {
  appState.isBlankLetterMode = true;
  renderFormsTable();
  renderDynamicFieldsEditor();
  renderLiveDocumentPreview();
  const bodyEl = document.getElementById('docEditableBody');
  if (bodyEl) bodyEl.focus();
  showToast(appState.uiLang === 'en' ? 'Blank letter opened with your letterhead' : 'تم فتح خطاب جديد فارغ بترويسة منشأتك');
}

function toggleDirectDocEditing() {
  enableDirectDocEditing(!appState.isDirectEditing);
  if (appState.isDirectEditing) {
    document.getElementById('docEditableBody').focus();
    showToast('وضع التحرير المباشر مفعّل: يمكنك تعديل أي نص داخل الخطاب');
  }
}

function enableDirectDocEditing(enable) {
  appState.isDirectEditing = enable;
  const bodyEl = document.getElementById('docEditableBody');
  const btn = document.getElementById('btnToggleEditDoc');
  bodyEl.contentEditable = enable ? 'true' : 'false';
  if (enable) {
    bodyEl.classList.add('editing-active');
    btn.classList.add('active');
  } else {
    bodyEl.classList.remove('editing-active');
    btn.classList.remove('active');
  }
}

function insertCustomParagraph() {
  enableDirectDocEditing(true);
  const bodyEl = document.getElementById('docEditableBody');
  const p = document.createElement('p');
  p.className = 'doc-paragraph';
  p.textContent = appState.uiLang === 'en' ? 'Additional paragraph text...' : 'اكتب النص الإضافي هنا...';
  bodyEl.appendChild(p);
  p.focus();
}

// =========================================================
// 5. COMPANY MODAL & IMAGE UPLOADS (LOGO, STAMP, SIGNATURE)
// =========================================================
function openModal(modalId) {
  if (modalId === 'companyModal') {
    const c = appState.company;
    document.getElementById('inputCompNameAr').value = c.nameAr || '';
    document.getElementById('inputCompNameEn').value = c.nameEn || '';
    document.getElementById('inputCompCr').value = c.cr || '';
    document.getElementById('inputCompPhone').value = c.phone || '';
    document.getElementById('inputCompEmail').value = c.email || '';
    document.getElementById('inputCompPostal').value = c.postal || '';
    document.getElementById('inputManagerName').value = c.managerName || '';
    document.getElementById('inputDocDate').value = c.docDate || '';
  }
  document.getElementById(modalId).classList.add('open');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('open');
}

function saveCompanyFromModal() {
  appState.company.nameAr = document.getElementById('inputCompNameAr').value.trim();
  appState.company.nameEn = document.getElementById('inputCompNameEn').value.trim();
  appState.company.cr = document.getElementById('inputCompCr').value.trim();
  appState.company.phone = document.getElementById('inputCompPhone').value.trim();
  appState.company.email = document.getElementById('inputCompEmail').value.trim();
  appState.company.postal = document.getElementById('inputCompPostal').value.trim();
  appState.company.managerName = document.getElementById('inputManagerName').value.trim();
  appState.company.docDate = document.getElementById('inputDocDate').value.trim();
  appState.company.isSampleData = false;

  renderCompanySummaryAndLetterhead();
  if (!appState.isBlankLetterMode) renderLiveDocumentPreview();
  persistWorkspaceQuietly();
  closeModal('companyModal');
  showToast('✅ تم تحديث بيانات المنشأة وترويسة الخطابات');
}

function clearAllCompanyData() {
  document.getElementById('inputCompNameAr').value = '';
  document.getElementById('inputCompNameEn').value = '';
  document.getElementById('inputCompCr').value = '';
  document.getElementById('inputCompPhone').value = '';
  document.getElementById('inputCompEmail').value = '';
  document.getElementById('inputCompPostal').value = '';
  document.getElementById('inputManagerName').value = '';
}

function handleImageUpload(event, targetType) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    alert('يرجى اختيار ملف صورة صالح (PNG, JPG, SVG).');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    const dataUrl = e.target.result;
    if (targetType === 'logo') appState.company.logoDataUrl = dataUrl;
    if (targetType === 'signature') appState.company.signatureDataUrl = dataUrl;
    if (targetType === 'stamp') appState.company.stampDataUrl = dataUrl;
    appState.company.isSampleData = false;
    renderCompanySummaryAndLetterhead();
    persistWorkspaceQuietly();
    showToast('✅ تم رفع الصورة وتحديث المعاينة');
  };
  reader.readAsDataURL(file);
}

function clearUploadedImage(targetType) {
  if (targetType === 'logo') appState.company.logoDataUrl = '';
  if (targetType === 'signature') appState.company.signatureDataUrl = '';
  if (targetType === 'stamp') appState.company.stampDataUrl = '';
  renderCompanySummaryAndLetterhead();
  persistWorkspaceQuietly();
}

// =========================================================
// 6. CUSTOM TEMPLATE CREATION & BACKUP
// =========================================================
function saveNewCustomTemplate() {
  const title = document.getElementById('newTplTitle').value.trim();
  const category = document.getElementById('newTplCategory').value;
  const heading = document.getElementById('newTplHeading').value.trim() || title;
  const body = document.getElementById('newTplBody').value.trim();

  if (!title || !body) {
    alert('يرجى إدخال اسم النموذج ونص الخطاب.');
    return;
  }

  const newId = 'custom-' + Date.now();
  const newTpl = {
    id: newId,
    number: getAllTemplates().length + 1,
    titleAr: title,
    titleEn: title,
    docHeadingAr: heading,
    docHeadingEn: heading,
    category,
    langType: 'both',
    bodyTemplate: body,
    fields: [
      { key: 'employeeName', labelAr: 'اسم الموظف', labelEn: 'Employee Name', type: 'text', defaultValue: 'أسامة بكر' },
      { key: 'jobTitle', labelAr: 'المسمى الوظيفي', labelEn: 'Job Title', type: 'text', defaultValue: 'مستشار إداري' },
      { key: 'department', labelAr: 'القسم', labelEn: 'Department', type: 'text', defaultValue: 'الإدارة العامة' }
    ]
  };

  appState.customTemplates.push(newTpl);
  initDefaultFormValues();
  appState.selectedFormId = newId;
  appState.isBlankLetterMode = false;

  renderFormsTable();
  renderDynamicFieldsEditor();
  renderLiveDocumentPreview();
  persistWorkspaceQuietly();
  closeModal('addTemplateModal');
  showToast('✅ تم إضافة النموذج الجديد بنجاح');
}

function exportWorkspaceBackup() {
  const dataStr = JSON.stringify({
    company: appState.company,
    customTemplates: appState.customTemplates,
    formValuesById: appState.formValuesById
  }, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `DarTool_HR_Backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importWorkspaceBackup(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      applyLoadedWorkspace(parsed);
      initDefaultFormValues();
      renderAllUI();
      persistWorkspaceQuietly();
      closeModal('settingsModal');
      showToast('✅ تم استعادة النسخة الاحتياطية بنجاح');
    } catch (_) {
      alert('ملف النسخة الاحتياطية غير صالح.');
    }
  };
  reader.readAsText(file);
}

// =========================================================
// 7. NAVIGATION, LANGUAGE SWITCHER, ZOOM, PRINT & PDF
// =========================================================
function handleNavClick(navKey) {
  document.querySelectorAll('.nav-item').forEach(li => {
    li.classList.toggle('active', li.dataset.nav === navKey);
  });

  if (navKey === 'company') openModal('companyModal');
  if (navKey === 'settings') openModal('settingsModal');
  if (navKey === 'help') openModal('helpModal');
  if (navKey === 'forms') {
    document.getElementById('formSearchInput').focus();
  }
}

function toggleAppLanguage() {
  appState.uiLang = appState.uiLang === 'ar' ? 'en' : 'ar';
  renderAllUI();
  persistWorkspaceQuietly();
}

function applyLanguageTranslations() {
  const isEn = appState.uiLang === 'en';
  document.getElementById('currentLangLabel').textContent = isEn ? 'English' : 'العربية';
  document.getElementById('uiAppTitle').textContent = isEn ? 'HR Forms Management System' : 'برنامج نماذج الموارد البشرية';
  document.getElementById('uiAppSubtitle').textContent = isEn ? 'Manage your HR forms professionally' : 'إدارة نماذجك بسهولة واحترافية';

  document.getElementById('navHomeText').textContent = isEn ? 'Dashboard' : 'الرئيسية';
  document.getElementById('navFormsText').textContent = isEn ? 'Forms' : 'النماذج';
  document.getElementById('navCompanyText').textContent = isEn ? 'Company Info' : 'بيانات المنشأة';
  document.getElementById('navSettingsText').textContent = isEn ? 'Settings' : 'إعدادات';
  document.getElementById('navHelpText').textContent = isEn ? 'Help' : 'مساعدة';

  document.getElementById('sideCompanyTitle').textContent = isEn ? 'Company Profile' : 'بيانات المنشأة';
  document.getElementById('btnEditCompanyText').textContent = isEn ? 'Edit Profile' : 'تعديل البيانات';

  document.getElementById('centerTitle').textContent = isEn ? 'Select Appropriate Form' : 'اختر النموذج المناسب';
  document.getElementById('btnBlankLetterText').textContent = isEn ? 'New Blank Letter' : 'إنشاء خطاب جديد';
  document.getElementById('btnAddTemplateText').textContent = isEn ? 'Custom Form' : 'نموذج مخصص';
  document.getElementById('formSearchInput').placeholder = isEn ? 'Search for a form...' : 'ابحث عن نموذج ...';

  document.getElementById('formsListTitle').textContent = isEn ? 'Forms List' : 'قائمة النماذج';
  document.getElementById('thFormName').textContent = isEn ? 'Form Name' : 'اسم النموذج';
  document.getElementById('thCategory').textContent = isEn ? 'Category' : 'الفئة';
  document.getElementById('fieldsEditorHeading').textContent = isEn ? 'Edit Form Details (Optional)' : 'تعديل بيانات النموذج (اختياري)';

  document.getElementById('btnPrintText').textContent = isEn ? 'Print' : 'طباعة';
  document.getElementById('btnPreviewText').textContent = isEn ? 'Preview' : 'معاينة';
  document.getElementById('btnSavePdfText').textContent = isEn ? 'Save as PDF' : 'حفظ كملف PDF';

  document.getElementById('previewTitle').textContent = isEn ? 'Letter Preview' : 'معاينة الخطاب';
  document.getElementById('lblToolbarEdit').textContent = isEn ? 'Edit' : 'تعديل';
  document.getElementById('lblToolbarAddText').textContent = isEn ? 'Add Text' : 'إضافة نص';
  document.getElementById('lblToolbarSave').textContent = isEn ? 'Save' : 'حفظ';
}

function adjustZoom(delta) {
  appState.zoomPercent = Math.min(130, Math.max(70, appState.zoomPercent + delta));
  const sheet = document.getElementById('a4Sheet');
  sheet.style.transform = `scale(${appState.zoomPercent / 100})`;
  document.getElementById('zoomPercentLabel').textContent = `${appState.zoomPercent}%`;
}

function resetZoom() {
  appState.zoomPercent = 100;
  document.getElementById('a4Sheet').style.transform = 'scale(1)';
  document.getElementById('zoomPercentLabel').textContent = '100%';
}

function toggleA4FrameSetting(showFrame, persist = true) {
  appState.showDecorativeFrame = showFrame;
  const sheet = document.getElementById('a4Sheet');
  if (sheet) {
    sheet.classList.toggle('no-frame', !showFrame);
  }
  if (persist) persistWorkspaceQuietly();
}

function scrollToPreview() {
  const preview = document.getElementById('previewSection');
  if (preview) {
    preview.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function triggerPrintDocument() {
  enableDirectDocEditing(false);
  window.print();
}

async function triggerExportPdf() {
  enableDirectDocEditing(false);
  const heading = document.getElementById('docMainHeading').textContent.trim() || 'مستند-الموارد-البشرية';
  const safeName = `${heading.replace(/[\\/:*?"<>|]/g, '-')}.pdf`;

  if (window.darToolDesktop && window.darToolDesktop.exportPdfNative) {
    const res = await window.darToolDesktop.exportPdfNative(safeName);
    if (res && res.success) {
      showToast('✅ تم حفظ ملف PDF بنجاح');
    }
    return;
  }

  showToast('📄 اختر "Save as PDF / حفظ بتنسيق PDF" من نافذة الطباعة');
  setTimeout(() => {
    window.print();
  }, 250);
}

function showToast(msg) {
  const el = document.getElementById('toastMsg');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    el.classList.remove('show');
  }, 2600);
}

function escapeHtmlAttr(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
