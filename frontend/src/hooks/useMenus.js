/**
 * @Category React Hook function
 * Provide single source to manage application static menus items
 * 
**/


export default function useMenus() {
    
    
    return {
	navbarTopRight: [],
	navbarTopLeft: [],
	navbarSideLeft: [
  {
    "to": "/home",
    "label": "Home",
    "icon": "pi pi-home",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "",
    "label": "Teachers",
    "icon": "pi pi-user",
    "iconcolor": "",
    "target": "",
    "items": [
      {
        "to": "/teachersroles",
        "label": "Roles",
        "icon": "pi pi-check-circle",
        "iconcolor": "",
        "target": "",
      }
    ]
  },
  {
    "to": "/students",
    "label": "Students",
    "icon": "pi pi-user-edit",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/classes",
    "label": "Classes",
    "icon": "pi pi-align-center",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/Subjects",
    "label": "subjects",
    "icon": "pi pi-list",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/Assignments",
    "label": "assignments",
    "icon": "pi pi-file-import",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/marks",
    "label": "Marks",
    "icon": "pi pi-align-left",
    "iconcolor": "",
    "target": "",
    "items": [
      {
        "to": "/form1marks",
        "label": "form 1 marks",
        "icon": "pi pi-th-large",
        "iconcolor": "",
        "target": "",
      },
      {
        "to": "/form2marks",
        "label": "Form 2 Marks",
        "icon": "pi pi-align-left",
        "iconcolor": "",
        "target": "",
      },
      {
        "to": "/form3marks",
        "label": "Form 3 Marks",
        "icon": "pi pi-align-left",
        "iconcolor": "",
        "target": "",
      },
      {
        "to": "/form4marks",
        "label": "Form 4 marks",
        "icon": "pi pi-align-left",
        "iconcolor": "",
        "target": "",
      }
    ]
  },
  {
    "to": "/permissions",
    "label": "Permissions",
    "icon": "pi pi-unlock",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/roles",
    "label": "Roles",
    "icon": "pi pi-key",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/users",
    "label": "Users",
    "icon": "pi pi-user-plus",
    "iconcolor": "",
    "target": "",
  }
],
	term: [    
{value: "term1", label: "Term 1"},
	{value: "term2", label: "Term 2"},
	{value: "term3", label: "Term 3"}
    ],
	asignmentName: [    
{value: "cat1", label: "Cat 1"},
	{value: "cat2", label: "Cat 2"},
	{value: "assignment1", label: "Assignment 1"},
	{value: "assignment2", label: "Assignment 2"}
    ],
	gender: [    
{value: "Male", label: "Male"},
	{value: "Female", label: "Female"}
    ],
        exportFormats: {
            print: {
                label: 'Print',
                icon: 'pi pi-print',
                type: 'print',
                ext: '',
            },
            pdf: {
                label: 'Pdf',
                icon: 'pi pi-file-pdf',
                type: 'pdf',
                ext: 'pdf',
            },
            excel: {
                label: 'Excel',
                icon: 'pi pi-file-excel',
                type: 'excel',
                ext: 'xlsx',
            },
            csv: {
                label: 'Csv',
                icon: 'pi pi-table',
                type: 'csv',
                ext: 'csv',
            },
        },
    }
}