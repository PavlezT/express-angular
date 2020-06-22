export function buildTableSettings(
  actions: {
    add: boolean;
    edit: boolean;
    delete: boolean;
  },
  columns: { [key: string]: { title: string; type: string; filter: boolean } }
) {
  return {
    actions: {
      ...actions
    },
    add: actions.add
      ? {
          addButtonContent: '<i class="nb-plus"></i>',
          createButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>',
          confirmCreate: true
        }
      : {},
    edit: actions.edit
      ? {
          editButtonContent: '<i class="nb-edit"></i>',
          saveButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>',
          confirmSave: true
        }
      : {},
    delete: actions.delete
      ? {
          deleteButtonContent: '<i class="nb-trash"></i>',
          confirmDelete: true
        }
      : {},
    columns: {
      ...columns
    }
  };
}
