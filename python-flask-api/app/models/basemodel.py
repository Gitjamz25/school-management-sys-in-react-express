from sqlalchemy.ext.declarative import DeclarativeMeta
from sqlalchemy import inspect

class BaseModel(object):

    def __iter__(self):
        return self._asdict().iteritems()

    def _asdict(self, backref=None):
        res = {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
        for attr, relation in self.__mapper__.relationships.items():
            # Avoid recursive loop between two tables.
            if backref == self.__table__:
                continue
            value = getattr(self, attr)
            if value is None:
                res[relation.key] = None
            elif isinstance(value.__class__, DeclarativeMeta):
                res[relation.key] = value._asdict(backref=self.__table__)
            else:
                res[relation.key] = [(row._asdict(backref=self.__table__)) for row in value]
        return res
