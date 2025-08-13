import React from "react";
import "../add_client/AddClient.scss";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Input from "../../comp/input/Input";
import SelectInput from "../../comp/SelectInput/SelectInput";
const AddActionItems = () => {
  return (
    <>
      <MainPanel>
        <div class="form">
          <div class="topbar">
            <h1>Add Action Items</h1>
          </div>
          <form action="">
            <div class="form-row">
              <SelectInput label="Project Name">
                <option value="">Select Project</option>
                <option value="nvm">nvm</option>
              </SelectInput>
              <Input label="Project Subtitle" />
            </div>
            <div class="form-row">
              <div class="input-textarea input">
                <label for="">Action Item Description</label>
                <textarea
                  placeholder="Action Item Description"
                  id=""
                ></textarea>
              </div>
              <SelectInput label="Action Item Status">
                <option value="">Select Status</option>
                <option value="To be started - Action Item is yet to be initated">
                  To be started
                </option>
                <option value="In Progress - Action Item is in progress">
                  In Progress
                </option>
                <option value="Planned - Action Item is planned">
                  Planned
                </option>
                <option value="Pending - Action Item is pending due to dependency on completition of another Action Item or some other event beyond the Owner's control at the moment">
                  Pending
                </option>
                <option value="Delayed - Action Item is delayed due to Owner not being in the capacity to act on it">
                  Delayed
                </option>
                <option value="Completed - Action Item is completed alongwith proof of confirmation from the relevant person/entity">
                  Completed
                </option>
                <option value="Cancelled">Cancelled</option>
                <option value="Closed">Closed</option>
              </SelectInput>
            </div>
          </form>
        </div>
      </MainPanel>
    </>
  );
};

export default AddActionItems;
