const Database = 'LMES';
const Package = 'PKG_MC_TOOLING';

const ToolingMaster = `${Database}/${Package}.SEL_TOOLING_MASTER`;
const ToolingInventory = `${Database}/${Package}.SEL_INVENTORY`;
const ToolingInventoryQty = `${Database}/${Package}.SEL_INVENTORY_QTY`;
const LocationMaster = `${Database}/${Package}.SEL_LOCATION_MASTER`;
const LineMaster = `${Database}/${Package}.SEL_LINE_MASTER`;
const SaveIncoming = `${Database}/${Package}.SAVE_INCOMING`;
const SaveOutgoing = `${Database}/${Package}.SAVE_OUTGOING`;

export { ToolingMaster, LocationMaster, ToolingInventory, LineMaster, SaveIncoming, SaveOutgoing, ToolingInventoryQty };
