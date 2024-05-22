/* 
    Interface: Mapper
        Functions:
            - toDomainModel: Persistence Object to DomainModel
            - toDomainModels?: Persistence Objects to DomainModels
            - toDPO: DomainModel to Persistence Object
            - toDTO?: DomainModel to Transport Object
            - toDTOs?: DomainModels to Transport Objects
            - toModifierDPO?: DomainModel Modifier Object to Persistence Modifier Object
*/
export interface Mapper<DomainModel> {
  toDomainModel(raw: any): DomainModel;
  toDomainModels?(raws: any[]): DomainModel[];

  toDPO(domainModel: DomainModel, ...params: any): any;

  toDTO?(domainModel: DomainModel): any;
  toDTOs?(domainModels: DomainModel[]): any[];

  /* This is a optional function for mapper, suggest to use save in repo when you want to update model data. */
  toModifierDPO?(domainModel: DomainModel, ...params: any): any;
}
