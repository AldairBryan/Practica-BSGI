from django.db import models

# Create your models here.
class Colaborador(models.Model):
    colcod = models.AutoField(db_column='ColCod', primary_key=True)
    colnom = models.CharField(db_column='ColNom',max_length=40)
    colape = models.CharField(db_column='ColApe',max_length=40)
    colfecnac = models.DateField(db_column='ColFecNac',)
    colpos = models.CharField(db_column='ColPos',max_length=40)

    class Meta:
        managed = True
        db_table = 'colaborador'

class Contacto(models.Model):
    concod = models.AutoField(db_column='ConCod', primary_key=True)
    concolcod = models.ForeignKey(Colaborador, on_delete=models.CASCADE, db_column='ConColCod')
    contip = models.CharField(db_column='ConTip', max_length=40)
    coninf = models.CharField(db_column='ConInf',max_length=40)

    class Meta:
        managed = True
        db_table = 'contacto'

class Contrato(models.Model):
    contrcod = models.AutoField(db_column='ContrCod', primary_key=True)
    contrcolcod = models.ForeignKey(Colaborador, on_delete=models.CASCADE, db_column='ContrColCod')
    contrfecini = models.DateField(db_column='ContrFecIni')
    contrfecfin = models.DateField(db_column='ContrFecFin', null=True, blank=True)
    contreps = models.CharField(db_column='ContrEps', max_length=100)
    contrseg = models.CharField(db_column='ContrSeg', max_length=100)

    class Meta:
        managed = True
        db_table = 'contrato'

class Horario(models.Model):
    horcod = models.AutoField(db_column='HorCod', primary_key=True)
    horcolcod = models.ManyToManyField(Colaborador, db_column='HorColCod')
    hordia = models.CharField(db_column='HorDia', max_length=9)
    horini = models.TimeField(db_column='HorIni')
    horfin = models.TimeField(db_column='HorFin')

    class Meta:
        managed = True
        db_table = 'horario'