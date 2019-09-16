<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="teal accent-4" dark class="mb-2">Add New</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ addItem }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.ID" label="ID"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.Street_Number" label="Street_Number"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.Street" label="Street"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.Suburb" label="Suburb"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.State" label="State"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.Unit_Number" label="Unit_Number"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.Street_Type" label="Street_Type"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.Property_Type" label="Property_Type"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" flat @click.native="close">Cancel</v-btn>
          <v-btn color="success" flat @click.native="saveChanges">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

     <v-text-field
            v-model="search"
            append-icon="search"
            label="Search Here"
            single-line
            hide-details
      ></v-text-field>

    <v-data-table
      :headers="headers"
      :items="properties"
      :search="search"
      :pagination.sync="pagination"
      hide-actions
      class="elevation-1"
    >

      <template slot="items" slot-scope="props">
        <td>{{ props.item.ID }}</td>
        <td class="text-xs-right">{{ props.item.Street_Number }}</td>
        <td class="text-xs-right">{{ props.item.Street }}</td>
        <td class="text-xs-right">{{ props.item.Suburb }}</td>
        <td class="text-xs-right">{{ props.item.State }}</td>
        <td class="text-xs-right">{{ props.item.PostCode }}</td>
        <td class="text-xs-right">{{ props.item.Unit_Number }}</td>
        <td class="text-xs-right">{{ props.item.Street_Type }}</td>
        <td class="text-xs-right">{{ props.item.Property_Type }}</td>
        
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="edit(props.item)">
            <v-icon color="warning">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteSelected(props.item)">
            <v-icon color="error">delete</v-icon>
          </v-btn>
        </td>
      </template>

      <v-alert class="text-sm-left" slot="no-results" :value="true" color="error">
              Sorry, Search result for "{{ search }}" has no results!
      </v-alert>
    </v-data-table>

     <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
   </div>
</template>

<script>
  export default {
    data: () => ({
      search: '',
      pagination: {rowsPerPage:5},
      dialog: false,
      headers: [
        { text: 'ID', value: 'ID' },
        { text: 'Street_Number', value: 'Street_Number' },
        { text: 'Street', value: 'Street' },
        { text: 'Suburb', value: 'Suburb' },
        { text: 'State', value: 'State' },
        { text: 'PostCode', value: 'PostCode' },
        { text: 'Unit_Number', value: 'Unit_Number' },
        { text: 'Street_Type', value: 'Street_Type' },
        { text: 'Property_Type', value: 'Property_Type' },      
        { text: 'Actions', value: 'id', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        ID: '',
        Street_Number: '',
        Street: '',
        Suburb: '',
        State: '',
        PostCode: '',
        Unit_Number: '',
        Street_Type: '',
        Property_Type: ''
      },
      initialItem: {
        ID: '',
        Street_Number: '',
        Street: '',
        Suburb: '',
        State: '',
        PostCode: '',
        Unit_Number: '',
        Street_Type: '',
        Property_Type: ''
      }
    }),

    computed: {
      properties(){
        return this.$store.getters['fed/properties'];
      },
      addItem () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
       //this.properties;
    },

    methods: {
      edit (item) {
        this.dialog = true
        this.editedIndex = this.properties.indexOf(item)
        this.editedItem = this.properties[this.properties.indexOf(item)];
        this.editedItem.ID = this.properties[this.properties.indexOf(item)].ID;
        this.editedItem.Street_Number = this.properties[this.properties.indexOf(item)].Street_Number;
        this.editedItem.Street = this.properties[this.properties.indexOf(item)].Street;
        this.editedItem.Suburb = this.properties[this.properties.indexOf(item)].Suburb;
        this.editedItem.State = this.properties[this.properties.indexOf(item)].State;
        this.editedItem.PostCode = this.properties[this.properties.indexOf(item)].PostCode;
        this.editedItem.Unit_Number = this.properties[this.properties.indexOf(item)].Unit_Number;
        this.editedItem.Street_Type = this.properties[this.properties.indexOf(item)].Street_Type;
        this.editedItem.Property_Type = this.properties[this.properties.indexOf(item)].Property_Type;
      },

      deleteSelected (item) {
        const index = this.properties.indexOf(item)
        confirm('Please confirm to delete') && this.properties.splice(index, 1)
          axios.delete(this.properties + item.id)
          .then(response=>{
            //console.log(response);
          })
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.initialItem)
          this.editedIndex = -1
        }, 300)
      },

      saveChanges () {
        if (this.editedIndex > -1) {
          axios.put(this.properties + this.editedItem.ID,{Street_Number:this.editedItem.Street_Number, Street: this.editedItem.Street, Suburb: this.editedItem.Suburb, State: this.editedItem.State, PostCode: this.editedItem.PostCode, Unit_Number: this.editedItem.Unit_Number, Street_Type: this.editedItem.Street_Type, Property_Type: this.editedItem.Property_Type})
          .then(response=>{
            this.initialItem = response.data;
          })
          this.initialItem = this.editedItem;
        } else {
          axios.post(this.properties,{Street_Number:this.editedItem.Street_Number, Street: this.editedItem.Street, Suburb: this.editedItem.Suburb, State: this.editedItem.State, PostCode: this.editedItem.PostCode, Unit_Number: this.editedItem.Unit_Number, Street_Type: this.editedItem.Street_Type, Property_Type: this.editedItem.Property_Type})
          .then(response=>{
            //console.log(response.data);
          })
          this.properties.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>